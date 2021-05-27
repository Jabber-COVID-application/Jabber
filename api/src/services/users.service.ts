import bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import HttpException from '@exceptions/HttpException';
import { RolloutDetails, RolloutPhase, User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import visitModel from '@models/visits.model';
import { isEmpty } from '@utils/util';
import { Visit } from '@/interfaces/visits.interface';
import { Model } from 'mongoose';

class UserService {
  public users = userModel;
  public visits = visitModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const active = true;

    // @ts-ignore
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
      active,
    });

    return createUserData;
  }

  public async updateUser(userId: string, userData: UpdateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    let user = await this.users.findById(userId);

    if (!user) throw new HttpException(409, "You're not user");

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId)
        throw new HttpException(409, `You're email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      user.password = hashedPassword;
    }

    if (userData.rolloutDetails) {
      const cleanRolloutDetails: RolloutDetails = this.cleanRolloutDetails(
        userData.rolloutDetails as RolloutDetails,
      );
      userData.rolloutDetails = cleanRolloutDetails;
      cleanRolloutDetails.phase = await this.getRolloutPhase(userId, userData);
      user.rolloutDetails = cleanRolloutDetails;
    }

    console.log(user, userData);

    const updateUserById: User = await user.save();

    console.log(updateUserById);

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }

  public async findUserVisits(userId: string): Promise<Visit[]> {
    const getVisits: Visit[] = await this.visits.find({ user: userId });

    return getVisits;
  }

  private cleanRolloutDetails(rolloutDetails: RolloutDetails) {
    return Object.entries(rolloutDetails).reduce<RolloutDetails>(
      (acc, [key, val]) => {
        if (key !== 'phase' && val == true) {
          acc[key] = true;
        }
        return acc;
      },
      {
        frontLineWorker: false,
        agedCareDisabilityWorker: false,
        agedCareDisabilityResident: false,
        highRiskWorker: false,
        careWorker: false,
        disability: false,
        medicalCondition: false,
        closeContact: false,
        essentialTravel: false,
        aboriginalOrTorresStrait: false,
      },
    );
  }

  private async getRolloutPhase(
    userId: string,
    userData: UpdateUserDto,
  ): Promise<RolloutPhase> {
    const user: User = await this.users.findById(userId);
    if (!user) throw new HttpException(409, 'User not found');

    const age = UserService.getAge(user.userDetails.dateOfBirth);
    const { rolloutDetails } = userData;

    if (
      rolloutDetails.frontLineWorker ||
      rolloutDetails.agedCareDisabilityWorker ||
      rolloutDetails.agedCareDisabilityResident
    )
      return RolloutPhase.PHASE_1A;

    if (
      rolloutDetails.highRiskWorker ||
      rolloutDetails.careWorker ||
      rolloutDetails.disability ||
      rolloutDetails.medicalCondition ||
      rolloutDetails.closeContact ||
      rolloutDetails.essentialTravel ||
      age >= 70 ||
      (rolloutDetails.aboriginalOrTorresStrait && age >= 50)
    )
      return RolloutPhase.PHASE_1B;

    if (age >= 50 || (rolloutDetails.aboriginalOrTorresStrait && age >= 16))
      return RolloutPhase.PHASE_2A;

    return age >= 16 ? RolloutPhase.PHASE_2B : RolloutPhase.PHASE_3;
  }

  private static getAge(dateOfBirth: Date): number {
    const diff = Date.now() - dateOfBirth.getTime();
    const age = new Date(diff);

    return Math.abs(age.getUTCFullYear() - 1970);
  }
}

export default UserService;

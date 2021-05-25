import React, { useEffect } from "react";
import Card from "../../../../components/atoms/card/Card";
import Button from "../../../../components/atoms/button/Button";
import { useStore } from "../../../../store";
import styles from "./VenuesModule.module.scss";
import CreateVenueModal from "./create-venue-modal/CreateVenueModal";
import { useState } from "react";
import { observer } from "mobx-react";
import VenueItem from "./venue-item/VenueItem";

const VenuesModule = observer(
  (): JSX.Element => {
    const { venues } = useStore();

    const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(
      false
    );

    useEffect(() => {
      venues.fetchOwnedVenues();
    }, []);

    return (
      <>
        <Card size="packed" label="Your Venues">
          <div className={styles.venues}>
            {venues.ownedVenues.length === 0 && (
              <p className={styles.noVenues}>No venues yet.</p>
            )}
            {venues.ownedVenues.map((venue) => (
              <VenueItem
                name={venue.name}
                address={venue.address.formatted}
                id={venue._id}
                key={venue._id}
              />
            ))}
          </div>

          <Button
            styleType="outline"
            size="small"
            className={styles.button}
            onClick={() => setIsCreateModalVisible(true)}
          >
            Add venue
          </Button>
        </Card>

        {isCreateModalVisible && (
          <CreateVenueModal close={() => setIsCreateModalVisible(false)} />
        )}
      </>
    );
  }
);

export default VenuesModule;

import React from 'react';
import { Row } from 'reactstrap';
import ProfileListView from './ProfileListView';

function collect(props) {
  return { data: props.data };
}

const ListProfileListing = ({ item, toggleModal }) => {
  return (
    <Row>
      <ProfileListView
        key={item.id}
        item={item}
        toggleModal={toggleModal}
        collect={collect}
      />
    </Row>
  );
};

export default React.memo(ListProfileListing);

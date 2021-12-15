
import React, { useState,useEffect } from 'react';

import { SingleSpace } from '../../../redux/actions';
import { connect } from 'react-redux';

function collect(props) {
  return { data: props.data };
}

const SingleLocationPg = ({
   space_id,
   location,
   intl,
    SingleSpaceAction
}) => {
    const { messages = '' } = intl || {};
    const [items, setItems] = useState([]);

    //.log("space_id",space_id);

    
  useEffect(() => {
    SingleSpaceAction(space_id);
  //   if (location?.data?.results) setItems(location.data.results);
  // }, [SingleSpaceAction]);
  }, [SingleSpaceAction]);


  return (
 
      
          <div>Test</div>
       
  );
};
const mapStateToProps = ({ space }) => {
     //console.log('single',space);
     // const { location, loading } = space;
     // return { location, loading };
     const { loading } = space;
     return { loading };
   };
   
   export default connect(mapStateToProps, {
    SingleSpaceAction : SingleSpace,
   })(SingleLocationPg);


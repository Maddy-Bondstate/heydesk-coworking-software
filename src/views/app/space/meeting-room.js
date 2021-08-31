import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import ListMeetingRoomHeading from '../../../containers/space/meeting-room/ListMeetingRoomHeading';
import AddMeetingRoomModal from '../../../containers/space/meeting-room/AddMeetingRoomModal';
import ListMeetingRoomListing from '../../../containers/space/meeting-room/ListMeetingRoomListing';

const pageSizes = [4, 8, 12, 20];

const SpaceMeetingRoom = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [selectedPageSize]);

  // useEffect(() => {
  //   console.log(
  //     `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&search=${search}`
  //   );
  //   async function fetchData() {
  //     axios
  //       .get(
  //         `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&search=${search}`
  //       )
  //       .then((res) => {
  //         return res.data;
  //       })
  //       .then((data) => {
  //         setTotalPage(data.totalPage);
  //         setItems(
  //           data.data.map((x) => {
  //             return { ...x, img: x.img.replace('img/', 'img/products/') };
  //           })
  //         );
  //         // setSelectedItems([]);
  //         setTotalItemCount(data.totalItem);
  //         setIsLoaded(true);
  //       });
  //   }
  //   fetchData();
  // }, [selectedPageSize, currentPage, search]);

  useEffect(() => {
    const items3 = [
      {
        id: 1,
        general: {
          name: 'Large Meeting Room',
          location: '',
          floor: '',
          size: 5,
          area: 22.6,
          available: {
            from: '27/08/2021',
            to: '30/08/2021',
          },
        },
        calendar: {
          rate: '',
          description: '',
          image:
            'https://dzrjcxtasfoip.cloudfront.net/user-resources/organization/small-meeting-room-1587244392084.png',
          color: '#FFFFFF',
          privacy: 1,
        },
      },
      {
        id: 2,
        general: {
          name: 'Small Meeting Room',
          location: '',
          floor: '',
          size: 3,
          area: 12.5,
          available: {
            from: '28/08/2021',
            to: '',
          },
        },
        calendar: {
          rate: '',
          description: '',
          image:
            'https://dzrjcxtasfoip.cloudfront.net/user-resources/organization/large-meeting-room-1587244372271.png',
          color: '#FF00AA',
          privacy: 1,
        },
      },
    ];
    setItems(items3);
    setIsLoaded(true);
  }, []);

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListMeetingRoomHeading
          heading="menu.meeting-rooms"
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          match={match}
          startIndex={startIndex}
          endIndex={endIndex}
          itemsLength={items ? items.length : 0}
          onSearchKey={(e) => {
            if (e.key === 'Enter') {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />

        <AddMeetingRoomModal
          modelTitle="space.add-meeting-room"
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
        />

        <ListMeetingRoomListing
          items={items}
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={setCurrentPage}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
      </div>
    </>
  );
};

export default SpaceMeetingRoom;

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
          name: 'Bondstate IT Solutions',
          uniqueCode: 'HYCS100',
          description: 'Bondstate Soln',
          businessHour: ['09:00', '17:00'],
          timezone: '',
          image:
            'https://www.bondstate.com/wp-content/uploads/2014/10/bond_log_center_2.png',
          isOpen: true,
        },
        address: {
          address: '2, Rajaji street',
          city: 'Puducherry',
          state: 'Puducherry',
          zip: '605005',
          country: 'India',
        },
        isPublic: true,
        floor: [
          {
            id: 20,
            name: 'Ground Floor',
            floor: 'Office',
            area: 0,
            target: 0,
            image:
              'https://www.heydesk.com/listimage/5d7f24b359b6bf2019055915_16672_400x400.jpg?v=1206843142',
            isOpen: false,
          },
          {
            id: 22,
            name: '2nd Floor',
            floor: 'Coworking Space',
            area: 0,
            target: 0,
            image:
              'https://www.heydesk.com/assets/images/top_slider.jpg?v=1.10',
            isOpen: true,
          },
        ],
      },
      {
        id: 2,
        general: {
          name: 'Heydesk - Coworking Space',
          uniqueCode: 'HYCS101',
          description: 'Heydesk Coworking space',
          businessHour: ['09:00', '17:00'],
          timezone: '',
          image: 'https://www.heydesk.com/assets/images/top_slider.jpg?v=1.10',
          isOpen: true,
        },
        address: {
          address: '32, Kuselan street',
          city: 'Puducherry',
          state: 'Puducherry',
          zip: '605001',
          country: 'India',
        },
        isPublic: false,
        floor: [],
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

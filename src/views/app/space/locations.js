import React, { useState, useEffect } from 'react';

// import axios from 'axios';

// import { servicePath } from '../../../constants/defaultValues';

import ListPageHeading from '../../../containers/pages/ListPageHeading';
import AddNewModal from '../../../containers/pages/AddNewModal';
import ListPageListing from '../../../containers/pages/ListPageListing';
// import useMousetrap from '../../../hooks/use-mousetrap';

// const getIndex = (value, arr, prop) => {
//   for (let i = 0; i < arr.length; i += 1) {
//     if (arr[i][prop] === value) {
//       return i;
//     }
//   }
//   return -1;
// };

// const apiUrl = `${servicePath}/cakes/paging`;

// const orderOptions = [
//   { column: 'title', label: 'Product Name' },
//   { column: 'category', label: 'Category' },
//   { column: 'status', label: 'Status' },
// ];
const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: 'Cakes', value: 'Cakes', key: 0 },
  { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
  { label: 'Desserts', value: 'Desserts', key: 2 },
];

const SpaceLocations = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  // const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  // const [selectedOrderOption, setSelectedOrderOption] = useState({
  //   column: 'title',
  //   label: 'Product Name',
  // });

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  // const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  // const [lastChecked, setLastChecked] = useState(null);

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
    const items3 =
      // {
      //   status: true,
      //   totalItem: 20,
      //   totalPage: 3,
      //   pageSize: '8',
      //   currentPage: '1',
      //   data:
      [
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
                'https://lh5.googleusercontent.com/p/AF1QipOQ-K_tlQaYFBwGx8NuQDtGbdM-lOhU00xttRjp=w1080-k-no',
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
            image:
              'https://www.heydesk.com/assets/images/top_slider.jpg?v=1.10',
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

  // };

  // const onCheckItem = (event, id) => {
  //   if (
  //     event.target.tagName === 'A' ||
  //     (event.target.parentElement && event.target.parentElement.tagName === 'A')
  //   ) {
  //     return true;
  //   }
  //   if (lastChecked === null) {
  //     setLastChecked(id);
  //   }

  // let selectedList = [...selectedItems];
  // if (selectedList.includes(id)) {
  //   selectedList = selectedList.filter((x) => x !== id);
  // } else {
  //   selectedList.push(id);
  // }
  // setSelectedItems(selectedList);

  // if (event.shiftKey) {
  //   let newItems = [...items];
  //   const start = getIndex(id, newItems, 'id');
  //   const end = getIndex(lastChecked, newItems, 'id');
  //   newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
  // selectedItems.push(
  //   ...newItems.map((item) => {
  //     return item.id;
  //   })
  // );
  // selectedList = Array.from(new Set(selectedItems));
  // setSelectedItems(selectedList);
  // }
  //   document.activeElement.blur();
  //   return false;
  // };

  // const handleChangeSelectAll = (isToggle) => {
  //   if (selectedItems.length >= items.length) {
  //     if (isToggle) {
  //       setSelectedItems([]);
  //     }
  //   } else {
  //     setSelectedItems(items.map((x) => x.id));
  //   }
  //   document.activeElement.blur();
  //   return false;
  // };

  // const onContextMenuClick = (e, data) => {
  //   // params : (e,data,target)
  //   console.log('onContextMenuClick - selected items', selectedItems);
  //   console.log('onContextMenuClick - action : ', data.action);
  // };

  // const onContextMenu = (e, data) => {
  //   const clickedProductId = data.data;
  //   if (!selectedItems.includes(clickedProductId)) {
  //     setSelectedItems([clickedProductId]);
  //   }

  //   return true;
  // };

  // useMousetrap(['ctrl+a', 'command+a'], () => {
  //   handleChangeSelectAll(false);
  // });

  // useMousetrap(['ctrl+d', 'command+d'], () => {
  //   setSelectedItems([]);
  //   return false;
  // });

  // console.log(items);

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="menu.locations"
          // displayMode={displayMode}
          // changeDisplayMode={setDisplayMode}
          // handleChangeSelectAll={handleChangeSelectAll}
          // changeOrderBy={(column) => {
          //   setSelectedOrderOption(
          //     orderOptions.find((x) => x.column === column)
          //   );
          // }}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          // selectedOrderOption={selectedOrderOption}
          match={match}
          startIndex={startIndex}
          endIndex={endIndex}
          // selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          onSearchKey={(e) => {
            if (e.key === 'Enter') {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          // orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <AddNewModal
          modelTitle="space.add-location"
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          categories={categories}
        />

        <ListPageListing
          items={items}
          // displayMode={displayMode}
          // selectedItems={selectedItems}
          // onCheckItem={onCheckItem}
          currentPage={currentPage}
          totalPage={totalPage}
          // onContextMenuClick={onContextMenuClick}
          // onContextMenu={onContextMenu}
          onChangePage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default SpaceLocations;

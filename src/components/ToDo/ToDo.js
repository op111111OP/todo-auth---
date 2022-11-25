import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { store } from "../../store";
import { fetchItem } from "../../store/dispatches/item.dispatch";
import AddItem from "../AddItem/AddItem";
import Items from "../Items/Items";
import styles from "./ToDo.module.scss";
const itemOnPage = 5;
function ToDo() {
  const [active, setActive] = useState(1);
  const [items, setItems] = useState([]);
  const [isItemsUpdate, setIsItemsUpdate] = useState(0);

  //   let active = 2;
  let numbers = [];
  for (let number = 1; number <= Math.ceil(items.length / 5); number++) {
    numbers.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => setActive(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  const updateItems = (isUpdate) => {
    if (isUpdate) {
      setIsItemsUpdate(isItemsUpdate + 1);
    }
  };

  async function getItems() {
    const data = await store.dispatch(fetchItem());

    if (data.payload) {
      setItems(data.payload);
      return;
    }
  }

  useEffect(() => {
    getItems();
  }, [isItemsUpdate]);

  return (
    <section>
      <div className="container">
        <h1 className={styles.title}>Додату нову задачу:</h1>
        <div className={styles.todoWrap}>
          <AddItem updateItems={updateItems} />
          <Items
            items={items.slice((active - 1) * itemOnPage, active * itemOnPage)}
            updateItems={updateItems}
          />
        </div>
        <Pagination>{numbers}</Pagination>
      </div>
    </section>
  );
}

export default ToDo;

import { Menu, X } from "lucide-react";
import { useState } from "react";

const meals = [
  {
    id: 1,
    name: "Classic Beef Burger",
    price: 180,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    calories: 650,
    people: 1,
    category: "Burger",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    price: 250,
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600",
    calories: 850,
    people: 2,
    category: "Pizza",
  },
  {
    id: 3,
    name: "Grilled Chicken",
    price: 220,
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600",
    calories: 520,
    people: 1,
    category: "Chicken",
  },
  {
    id: 4,
    name: "Pasta Alfredo",
    price: 195,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600",
    calories: 720,
    people: 1,
    category: "Pasta",
  },
  {
    id: 5,
    name: "Double Cheese Burger",
    price: 230,
    image:
      "https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    calories: 780,
    people: 1,
    category: "Burger",
  },
  {
    id: 6,
    name: "BBQ Chicken Pizza",
    price: 290,
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600",
    calories: 920,
    people: 2,
    category: "Pizza",
  },
  {
    id: 7,
    name: "Crispy Chicken Burger",
    price: 210,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600",
    calories: 710,
    people: 1,
    category: "Burger",
  },
  {
    id: 8,
    name: "Grilled Salmon",
    price: 340,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600",
    calories: 480,
    people: 1,
    category: "Seafood",
  },
  {
    id: 9,
    name: "Creamy Mushroom Pasta",
    price: 215,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600",
    calories: 690,
    people: 1,
    category: "Pasta",
  },
  {
    id: 10,
    name: "Chicken Alfredo Pasta",
    price: 245,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600",
    calories: 760,
    people: 1,
    category: "Pasta",
  },
  {
    id: 11,
    name: "Caesar Salad",
    price: 160,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600",
    calories: 320,
    people: 1,
    category: "Salad",
  },
  {
    id: 12,
    name: "Grilled Chicken Salad",
    price: 190,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    calories: 410,
    people: 1,
    category: "Salad",
  },
  {
    id: 13,
    name: "Pepperoni Pizza",
    price: 280,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600",
    calories: 950,
    people: 2,
    category: "Pizza",
  },
  {
    id: 14,
    name: "Chicken Wings",
    price: 200,
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600",
    calories: 590,
    people: 1,
    category: "Chicken",
  },
  {
    id: 15,
    name: "Chocolate Pancakes",
    price: 175,
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600",
    calories: 640,
    people: 2,
    category: "Dessert",
  },
  {
    id: 16,
    name: "Strawberry Cheesecake",
    price: 145,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600",
    calories: 430,
    people: 1,
    category: "Dessert",
  },
];

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addMeal, setAddMeal] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedCat, setSelectedCat] = useState();

  const filteredMeals = meals.filter(
    (meal) =>
      meal.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCat === undefined || meal.category === selectedCat),
  );

  function handleCart() {
    setIsCartOpen((is) => !is);
  }

  function clearCart() {
    addMeal.length !== 0 ? setAddMeal([]) : setIsCartOpen(false);
  }

  function handleSeach(e) {
    setSearch(e.target.value);
  }

  function handleFilterMeal(item) {
    setSelectedCat(item !== selectedCat ? item : undefined);
  }

  function handleAddMeal(meals) {
    setAddMeal((cart) => {
      const exists = cart.some((meal) => meal.id === meals.id);

      return exists
        ? cart.map((item) =>
            item.id === meals.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...cart, { ...meals, quantity: 1 }];
    });
  }

  return (
    <div className="app">
      {/* <!-- ===== Main ===== --> */}
      <main className="main">
        <Navbar
          addMeal={addMeal}
          onHandleCart={handleCart}
          onHandleSearch={handleSeach}
          search={search}
        />
        <nav className="breadcrumb">
          Store <i></i> <b>Bell fresh</b>
        </nav>

        <Banner />

        <Categories
          selectedCat={selectedCat}
          onHandleSelect={handleFilterMeal}
        />

        <h2 className="section-title">Popular Dish</h2>

        <Dishes onAddMeal={handleAddMeal} filteredMeals={filteredMeals} />
      </main>

      {/* <!-- ===== Cart ===== --> */}
      {isCartOpen && <div className="backdrop" onClick={handleCart} />}
      <Cart isCartOpen={isCartOpen} onClearCart={clearCart} addMeal={addMeal} />
    </div>
  );
}

function Navbar({ onHandleCart, addMeal, onHandleSearch, search }) {
  return (
    <header className="topbar">
      <button className="btn-menu" aria-label="Menu">
        <Menu />
      </button>
      <label className="search">
        <span className="search-icon">&#9906;</span>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={onHandleSearch}
        />
      </label>
      <button
        className="btn-icon btn-basket"
        aria-label="Basket"
        onClick={onHandleCart}
      >
        &#128722;
        <span className="badge">
          {addMeal.reduce((acc, meal) => {
            return acc + meal.quantity;
          }, 0)}
        </span>
      </button>
    </header>
  );
}

function Banner() {
  return (
    <section className="banner">
      <div className="logo">
        Bell<small>fresh</small>
      </div>
      <div className="banner-text">
        <h1>Bell fresh</h1>
        <p>Fresh &amp; healthy food recipe</p>
      </div>
      <div className="stats">
        <div>
          <strong>24</strong>
          <span>Total item</span>
        </div>
        <div>
          <strong>09</strong>
          <span>Category</span>
        </div>
        <div>
          <strong>04</strong>
          <span>Outlate</span>
        </div>
      </div>
    </section>
  );
}

function Categories({ onHandleSelect, selectedCat }) {
  let categories = [...new Set(meals.map((meal) => meal.category))];

  return (
    <section className="categories">
      {categories.map((category) => {
        const meal = meals.find((meal) => meal.category === category);

        return (
          <Category
            name={category}
            image={meal.image}
            key={meal.id}
            onClick={onHandleSelect}
            selectedCat={selectedCat}
          />
        );
      })}
    </section>
  );
}

function Category({ name, image, onClick, selectedCat }) {
  return (
    <>
      <button
        className={`cat ${name === selectedCat ? "active" : ""}`}
        onClick={() => onClick(name)}
      >
        <span>
          <img className={`food f-${name}`} src={image} alt={name} />
        </span>
        {name}
      </button>
    </>
  );
}

function Dishes({ onAddMeal, filteredMeals }) {
  return (
    <section className="dishes">
      <DishesList onAddMeal={onAddMeal} filteredMeals={filteredMeals} />
    </section>
  );
}

function Cart({ isCartOpen, onClearCart, addMeal }) {
  return (
    <>
      {isCartOpen && (
        <aside className="cart">
          <div className="cart-head">
            <h2>My cart</h2>
            <button
              className="btn-clear"
              aria-label="Clear cart"
              onClick={onClearCart}
            >
              <X />
            </button>
          </div>

          <ul className="cart-list">
            <CartList addMeal={addMeal} />
          </ul>

          <div className="summary">
            <div className="row">
              <span>Final</span>
              <span>
                $
                {addMeal.reduce((acc, meal) => {
                  return acc + meal.price * meal.quantity;
                }, 0)}
              </span>
            </div>
            <div className="row">
              <span>Discount</span>
              <span className="green">%10</span>
            </div>
            <div className="row total">
              <span>Final</span>
              <span>
                $
                {addMeal.reduce((acc, meal) => {
                  return acc + (meal.price - meal.price * 0.1) * meal.quantity;
                }, 0)}
              </span>
            </div>
          </div>

          <button className="checkout">Checkout</button>
        </aside>
      )}
    </>
  );
}

function CartList({ addMeal }) {
  return (
    <>
      {addMeal.map((meal) => (
        <li key={meal.id}>
          <span>
            <img className="thumb t-salad" src={meal.image} alt={meal.name} />
          </span>
          <span className="qty">
            {meal.quantity} <em>&times;</em> {meal.name}
          </span>
          <b>${meal.price}</b>
        </li>
      ))}
    </>
  );
}

function DishesList({ onAddMeal, filteredMeals }) {
  return (
    <>
      {filteredMeals.length !== 0
        ? filteredMeals.map((meal) => (
            <article key={meal.id} className="dish">
              <div>
                <img
                  className="plate plate-a"
                  src={meal.image}
                  alt={meal.name}
                />
              </div>
              <h3>{meal.name}</h3>
              <p className="meta">
                {meal.calories} Calories <i></i> {meal.people} persons
              </p>
              <div className="buy">
                <span className="price">${meal.price}</span>
                <button className="add" onClick={() => onAddMeal(meal)}>
                  +
                </button>
              </div>
            </article>
          ))
        : "No meals found"}
    </>
  );
}

export default App;

import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import CartItem from "./CartItem";
import StoreItems from "../data/items.json";

export default function ShoppingCart() {
  const { closeCart, isOpen, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fs-5 fw-bold">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = StoreItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0),
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/CartContext";
import StoreItems from "../data/items.json";
import { formatCurrency } from "../utils/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export default function ({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = StoreItems.find((item) => item.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={3} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x {quantity}
            </span>
          )}
        </div>
        <div>
          <span className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(item.price)}
          </span>
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}

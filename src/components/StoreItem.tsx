import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export default function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    decreaseCartQuantity,
    increaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        style={{ objectFit: "cover" }}
        height="200px"
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-3">
          <span className="fs-2">{name}</span>
          <span className="text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              Add to Cart
            </Button>
          ) : (
            <div className="d-flex justify-content-center align-items-center flex-column gap-2">
              <div className="d-flex justify-content-center align-items-center flex-row gap-1">
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                <div>
                  <span className="fs-2">{quantity}</span> in Cart
                </div>
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

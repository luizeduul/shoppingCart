import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import EmptyCart from '../../components/EmptyCart';

import * as CartActions from '../../store/modules/cart/actions';

import formatValue from '../../utils/formatValue';

import {
  ActionButton,
  ActionContainer,
  Container,
  Product,
  ProductContainer,
  ProductImage,
  ProductList,
  ProductPrice,
  ProductQuantity,
  ProductSinglePrice,
  ProductTitle,
  ProductPriceContainer,
  ProductTitleContainer,
  TotalContainer,
  TotalProductsContainer,
  TotalProductsText,
  SubTotalValue,
} from './styles';

const Cart = () => {
  const dispatch = useDispatch();

  const products = useSelector(({ cart }) => cart);

  const cartSize = useMemo(() => {
    return products.length || 0;
  }, [products]);

  const cartTotal = useMemo(() => {
    const cartAmount = products.reduce((accumulator, product) => {
      const totalPrice = accumulator + product.price * product.amount;
      return totalPrice;
    }, 0);
    return formatValue(cartAmount);
  }, [products]);

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function removeFromCart(id) {
    dispatch(CartActions.removeFromCart(id));
  }

  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<EmptyCart />}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={{ uri: item.image_url }} />
              <ProductTitleContainer>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPriceContainer>
                  <ProductSinglePrice>
                    {formatValue(item.price)}
                  </ProductSinglePrice>
                  <TotalContainer>
                    <ProductQuantity>{`${item.amount}x`}</ProductQuantity>
                    <ProductPrice>
                      {formatValue(item.price * item.amount)}
                    </ProductPrice>
                  </TotalContainer>
                </ProductPriceContainer>
              </ProductTitleContainer>
              <ActionContainer>
                <ActionButton onPress={() => increment(item)}>
                  <Icon name="plus" size={16} color="#E83F5B" />
                </ActionButton>
                <ActionButton
                  onPress={() =>
                    item.amount > 1 ? decrement(item) : removeFromCart(item.id)
                  }
                >
                  <Icon name="minus" size={16} color="#E83F5B" />
                </ActionButton>
              </ActionContainer>
            </Product>
          )}
        />
      </ProductContainer>
      <TotalProductsContainer>
        <Icon name="shopping-cart" size={24} color="#FFF" />
        <TotalProductsText>
          {cartSize} {cartSize === 1 ? 'item' : 'items'}
        </TotalProductsText>
        <SubTotalValue>{cartTotal}</SubTotalValue>
      </TotalProductsContainer>
    </Container>
  );
};

export default Cart;

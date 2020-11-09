import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FloatingCart from '../../components/FloatingCart';

import * as CartActions from '../../store/modules/cart/actions';
import Api from '../../services/api';

import formatValue from '../../utils/formatValue';

import {
  Container,
  ProductTitle,
  ProductPrice,
  ProductList,
  PriceContainer,
  Product,
  ProductButton,
  ProductButtonText,
  ProductContainer,
  ProductImage,
} from './styles';

const Catalog = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await Api.get('/products');

      setProducts(data);
    }
    loadProducts();
  }, []);

  function handleAddToCart(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={{ uri: item.image_url }} />
              <ProductTitle>{item.title}</ProductTitle>
              <PriceContainer>
                <ProductPrice>{formatValue(item.price)}</ProductPrice>
                <ProductButton onPress={() => handleAddToCart(item.id)}>
                  <ProductButtonText>Adicionar</ProductButtonText>
                  <Feather name="plus-circle" size={30} color="#D1D7E9" />
                </ProductButton>
              </PriceContainer>
            </Product>
          )}
        />
      </ProductContainer>
      <FloatingCart />
    </Container>
  );
};

export default Catalog;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Rating } from "@mui/material";
import styled from "styled-components";
import {
  AddShoppingCartOutlined,
  FavoriteBorder,
  FavoriteRounded,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { getFavourite } from "../../api";

const Card = styled.div`
  max-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease-out;
  cursor: pointer;
`;
const Image = styled.img`
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
  transition: all 0.3s ease-out;
`;

const Menu = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  top: 14px;
  right: 14px;
  display: none;
  flex-direction: column;
  gap: 12px;
`;
const MenuItem = styled.div`
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background: white;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;
const Rate = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  bottom: 8px;
  left: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  background: white;
  display: flex;
  align-items: center;
  opacity: 0.9;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 6px;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
  &:hover ${Image} {
    opacity: 0.9;
  }
  &:hover ${Menu} {
    display: flex;
  }
`;
const Details = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 4px 10px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Location = styled.div`
  width: fit-content;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 10px;
  border-radius: 20px;
  background: ${({ theme }) => theme.disabled + 50};
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Strike = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 60};
  text-decoration: line-through;
  text-decoration-color: ${({ theme }) => theme.text_secondary + 50};
`;
const Span = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
`;
const Percent = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: green;
`;

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const addToFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("airbnb-app-token");
    await addToFavorite(token, { propertyId: property?._id })
      .then((res) => {
        setFavorite(true);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setFavoriteLoading(false);
      });
  };

  const removeFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("airbnb-app-token");
    await addToFavorite(token, { propertyId: property?._id })
      .then((res) => {
        setFavorite(false);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setFavoriteLoading(false);
      });
  };

  const checkFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("airbnb-app-token");
    await getFavourite(token, { propertyId: property?._id })
      .then((res) => {
        const isFavorite = res.data?.some(
          (favorite) => favorite._id === property._id
        );
        setFavorite(isFavorite);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setFavoriteLoading(false);
      });
  };

  useEffect(() => {
    checkFavorite();
  }, []);
  return (
    <Card>
      <Top>
        <Image
          src={property?.img || "/placeholder.jpg"}
          alt={property?.title}
        />
        <Menu>
          <MenuItem onClick={() => {(favorite ? removeFavorite() : addToFavorite())}}>
            {favoriteLoading ? (
              <CircularProgress sx={{ fontSize: "20px" }} />
            ) : (
              <>
                {favorite ? (
                  <FavoriteRounded sx={{ fontSize: "20px" }} />
                ) : (
                  <FavoriteBorder sx={{ fontSize: "20px" }} />
                )}
              </>
            )}
          </MenuItem>
        </Menu>
        <Rate>
          <Rating
            value={property?.rating || 0}
            sx={{ fontSize: "14px" }}
            readOnly
          />
        </Rate>
      </Top>
      <Details onClick={() => navigate(`/properties/${property._id}`)}>
        <Title>{property?.title || "No Title Available"}</Title>
        <Desc>{property?.desc || "No Description Available"}</Desc>
        <Location>{property?.location || "Unknown Location"}</Location>
        <Price>
          ${property?.price?.org || "N/A"}
          <Strike>${property?.price?.mrp || "N/A"}</Strike>
          <Percent>{property?.price?.off || 0}% Off</Percent>
        </Price>
      </Details>
    </Card>
  );
};

export default PropertyCard;

import React from "react";
import S from "../Description/styles.module.css";

interface RocketInfoProps {
    name: string,
    height: {
        meters: number
    },
    diameter: {
        meters: string
    },
    mass: {
        kg: string
    },
    flickr_images: string,
}

export const RocketInfo: React.FC<{data: RocketInfoProps}> = ({data}) => {
  const {name, height, diameter, mass, flickr_images} = data;
  return (
    <div className={S.rocketList__info}>
      <div>
        <img
          className={S.rocketList__image}
          src={flickr_images}
          alt={name}
        />
      </div>
      <div className={S.rocketList__details}>
        <h3>{name}</h3>
        <div>Height: {height['meters']} meters</div>
        <div>Diameter: {diameter['meters']} meters</div>
        <div>Mass: {mass['kg']} kg</div>
      </div>
    </div>
  )
}
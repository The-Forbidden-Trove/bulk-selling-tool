import React from "react";
import styled from "styled-components";
import { FlexWrap } from "../../baseStyles";
import { Divider } from "./Divider";

export const Offense = ({ item }: any) => {
  return (
    <>
      {item.offense && (
        <>
            {item.offense && item.offense.damage.physical.max > 0 && (
          <Property>
                <PropertySpan>Physical Damage</PropertySpan>
                <PropertySpanDefaultColor>
                  {item.offense.damage.physical.min} -{" "}
                  {item.offense.damage.physical.max}
                </PropertySpanDefaultColor>
          </Property>
            )}

            {item.offense && item.offense.damage.lightning.max > 0 && (
          <Property>
                <PropertySpan>Cold Damage</PropertySpan>
                <PropertySpanDefaultColor>
                  {item.offense.damage.lightning.min} -{" "}
                  {item.offense.damage.lightning.max}
                </PropertySpanDefaultColor>
          </Property>
            )}

            {item.offense && item.offense.damage.fire.max > 0 && (
          <Property>
                <PropertySpan>Cold Damage</PropertySpan>
                <PropertySpanDefaultColor>
                  {item.offense.damage.fire.min} -{" "}
                  {item.offense.damage.fire.max}
                </PropertySpanDefaultColor>
          </Property>
            )}

            {item.offense && item.offense.critChance > 0 && (
          <Property>
                <PropertySpan>Crit Chance</PropertySpan>
                <PropertySpanDefaultColor>
                  {item.offense.critChance}%
                </PropertySpanDefaultColor>
          </Property>
            )}

            {item.offense && item.offense.range > 0 && (
          <Property>
                <PropertySpan>Weapon Range</PropertySpan>
                <PropertySpanDefaultColor>
                  {item.offense.range}
                </PropertySpanDefaultColor>
          </Property>
            )}

            {item.offense.aps && item.offense.damage.cold.max > 0 && (
          <Property>
                <PropertySpan>Cold Damage</PropertySpan>
                <PropertySpanDefaultColor>
                  {item.offense.damage.cold.min} -{" "}
                  {item.offense.damage.cold.max}
                </PropertySpanDefaultColor>
          </Property>
            )}

          <Divider item={item}></Divider>
        </>
      )}
    </>
  );
};

const Property = styled(FlexWrap)`
  color: #7f7f7f;
  padding: 1px 0px;
`;

const PropertySpan = styled("span")`
  color: #7f7f7f;
  padding: 0px 1px;
`;

const PropertySpanColor = styled("span")`
  color: #88f;
  padding: 0px 1px;
`;

const PropertySpanDefaultColor = styled("span")`
  padding: 0px 1px;
`;

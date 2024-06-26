import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../..";
import { CurrencyType } from "../../types";
import { toggleSelectCurrency } from "../../reducers/currencyTypeReducer";
import { Button, FlexWrap, Input } from "../baseStyles";

import { useState } from "react";
import { useAuth } from "../../api/oauth/AuthContext";
import { selectStash } from "../../reducers/stashReducer";
import { NinjaItem } from "../../types";

import { toast } from "react-toastify";

const CurrencyTypePicker = () => {
  const currencyTypes = useAppSelector((store) => store.currencyTypes);
  const dispatch = useAppDispatch();

  const league = useAppSelector((store) => store.leagues).defaultLeague;

  const [multiplier, setInput] = useState<string>("100%");

  const { authService } = useAuth();

  const ninjaItems: Record<string, NinjaItem> = JSON.parse(
    window.localStorage.getItem("ninjaItems") || "{}"
  );

  const click = () => {
    dispatch(
      selectStash(
        authService.getAuthTokens().access_token,
        league,
        Number(multiplier.substr(0, multiplier.length - 1)) || 0,
        ninjaItems
      )
    );
    let isContract = false;
    let isSextant = false;
    currencyTypes.forEach((currencyType: CurrencyType) => {
      if (
        currencyType.isSelected &&
        (currencyType.type === "Contract")
      )
        isContract = true;

      if (
        currencyType.isSelected &&
        (currencyType.type === "Sextant")
      )
        isSextant = true;
    });
    if (isContract) {
      toast.info(
        "We ask you to just paste the generated text - no need for the image when selling contracts."
      );
      toast.warn(
        "You are using an experimental type, please input the prices yourself since they are not supported by poe.ninja."
      );
    }

    if (isSextant) {
      toast.info(
        "We ask you to just paste the generated text - no need for the image when selling sextants."
      );
    }
    setInput("100%");
  };

  const handleMultiplierChange = (e: any) => {
    const val = e.target.value;
    if (/^\d*\.?\d*%$/.test(val)) {
      setInput(val);
    }
  };
  const onKeyPress = (event: any) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^[0-9\b.]+$/.test(keyValue)) event.preventDefault();
  };

  return (
    <Cont>
      <Header>2. Pick currency type</Header>
      <Wrapper>
        <AllTypes>
          {currencyTypes.map((currencyType: CurrencyType) => {
            return (
              <TypeWrap
                key={currencyType.type}
                isSelected={currencyType.isSelected}
                onClick={() =>
                  dispatch(toggleSelectCurrency(currencyType.type))
                }
              >
                <Icon src={currencyType.icon} alt="icon" />
                <p>
                  {currencyType.type === "BlightedMap"
                    ? "Blighted Map"
                    : currencyType.type === "BlightRavagedMap"
                    ? "Blight Ravaged Map"
                    : currencyType.type === "DeliriumOrb"
                    ? "Delirium Orb"
                    : currencyType.type === "DivinationCard"
                    ? "Divination"
                    : currencyType.type === "AllflameEmber"
                    ? "Allflame"
                    : currencyType.type}
                </p>
              </TypeWrap>
            );
          })}
        </AllTypes>

        <ButtonWrap>
          <FlexWrap>
            <P>Asking price is</P>
            <Multiplier
              placeholder="Default multiplier 100%"
              value={multiplier}
              onChange={handleMultiplierChange}
              onKeyPress={onKeyPress}
            />
            <P>of ninja price</P>
          </FlexWrap>
          <AddTab onClick={() => click()}>Select tab</AddTab>
        </ButtonWrap>
      </Wrapper>
    </Cont>
  );
};

export default CurrencyTypePicker;

const Cont = styled.div`
  padding: 10px 0px 10px 0px;
  width: 40%;
  height: 100%;
`;

const ButtonWrap = styled(FlexWrap)`
  padding: 0px 15px 0px 15px;

  justify-content: space-between;
`;
const Multiplier = styled(Input)`
  width: 3em;

  color: ${(props) => props.theme.colors.accent2};
  text-align: center;
  font-size: ${(props) => props.theme.fontM};
`;

const AddTab = styled(Button)`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontM};

  padding: 5px;
  width: 8em;
  border: 1px solid ${(props) => props.theme.colors.text};
  border-radius: 3px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0px 0px 0px;
  height: 80%;
`;

const AllTypes = styled.div`
  color: ${(props) => props.theme.colors.accent};
  display: flex;
  flex-wrap: wrap;
  height: 138px;

  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    background: none;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;

    background: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
`;

const TypeWrap = styled(FlexWrap)<{ isSelected?: boolean }>`
  cursor: pointer;
  max-height: 36px;
  padding: 5px 3px;
  > p {
    color: ${(props) =>
      props.isSelected ? props.theme.colors.accent : props.theme.colors.text};
    font-size: ${(props) => props.theme.fontM};
    padding: 0px 5px;
  }
`;

const Icon = styled.img`
  padding: 0px 5px 0px 0px;
  width: 36px;
  height: 36px;
  object-fit: contain;
`;

const P = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontM};
  padding: 0px 5px 0px 0px;
`;

const Header = styled.h3`
  text-align: center;
  padding: 5px 0px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontM};
  height: 20%;
`;

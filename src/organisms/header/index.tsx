import { IMG_FIRMA_LOGO } from "@/consts/images";
import { ConnectKeplr } from "@/utils/common";
import theme from "@/themes";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    padding: 15px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    position: fixed;
    background: ${theme.colors.mainBackground};
    z-index: 10;

    @media only screen and (max-width: 768px) {
        padding: 15px 20px;
    }
`;

const LogoImg = styled.img`
    width: 194px;
    height: auto;
    object-fit: contain;
    cursor: pointer;

    @media only screen and (max-width: 768px) {
        width: 140px;
    }
`;


const HeaderButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderButton = styled.div`
  display: flex;
  padding: 8px 20px 9px 20px;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;

  border-radius: 100px;
  border: 2px solid #ac3def;
  background: #121416;
  backdrop-filter: blur(10px);
  cursor: pointer;
`;
const HeaderButtonText = styled.div`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.14px;
  background: linear-gradient(277deg, #ac3def 5.57%, #5bbaff 124.83%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;


const Header = () => {
    const onCLickLogo = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <Container>
            <LogoImg src={IMG_FIRMA_LOGO} alt={"Firmachain"} onClick={onCLickLogo} />
            <HeaderButtonWrapper>
                <HeaderButton onClick={() => ConnectKeplr()}>
                    <HeaderButtonText>{"Keplr Connect"}</HeaderButtonText>
                </HeaderButton>
            </HeaderButtonWrapper>
        </Container>
    );
};

export default Header;

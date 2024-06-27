import React from "react";

import { EXPLORER, MEDIUM, OFFICIAL, STATION, TELEGRAM, TWITTER } from "@/consts/urls";

import { Copyright, FooterBottom, FooterContainer, FooterLogo, FooterTop, FooterWrapper, LinkIcon, LinkItem, LinkList, LinkTypo, SocialIcon, SocialItem, SocialList } from "./styles";
import { IC_FIRMA_LOGO_2, IC_LINK_EXTERNAL, IC_MEDIUM, IC_TELEGRAM, IC_TWITTER } from "@/consts/images";

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrapper>
                <FooterTop>
                    <LinkList>
                        <LinkItem href={OFFICIAL} target={"_blank"} rel={"noopener noreferrer"}>
                            <LinkTypo>FIRMACHAIN</LinkTypo>
                            <LinkIcon src={IC_LINK_EXTERNAL} />
                        </LinkItem>

                        <LinkItem href={STATION} target={"_blank"} rel={"noopener noreferrer"}>
                            <LinkTypo>Firma station</LinkTypo>
                            <LinkIcon src={IC_LINK_EXTERNAL} />
                        </LinkItem>

                        <LinkItem href={EXPLORER} target={"_blank"} rel={"noopener noreferrer"}>
                            <LinkTypo>Block Explorer</LinkTypo>
                            <LinkIcon src={IC_LINK_EXTERNAL} />
                        </LinkItem>
                    </LinkList>
                    <SocialList>
                        <SocialItem href={MEDIUM} target={"_blank"} rel={"noopener noreferrer"}>
                            <SocialIcon src={IC_MEDIUM} />
                        </SocialItem>
                        <SocialItem href={TWITTER} target={"_blank"} rel={"noopener noreferrer"}>
                            <SocialIcon src={IC_TWITTER} />
                        </SocialItem>
                        <SocialItem href={TELEGRAM} target={"_blank"} rel={"noopener noreferrer"}>
                            <SocialIcon src={IC_TELEGRAM} />
                        </SocialItem>
                    </SocialList>
                </FooterTop>
                <FooterBottom>
                    <a href={OFFICIAL} target={"_blank"} rel={"noopener noreferrer"}>
                        <FooterLogo src={IC_FIRMA_LOGO_2} />
                    </a>
                    <Copyright>Copyright © 2024 FIRMACHAIN. All Rights Reserved.</Copyright>
                </FooterBottom>
            </FooterWrapper>
        </FooterContainer>
    );
};

export default React.memo(Footer);

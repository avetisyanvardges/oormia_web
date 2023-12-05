import {
    Box,
    Button,
    ButtonBase,
    Container,
    Divider,
    Hidden,
    Modal,
    Stack,
    Typography,
    useMediaQuery
} from "@mui/material";
import React, {createRef, useEffect, useLayoutEffect, useRef, useState} from "react";
import styled from "@emotion/styled";
import {useSearchParams} from "next/navigation";
import {useWindowSize} from "../../hook/useWindowSize";
import {FormattedMessage} from "react-intl";
import {useTranslate} from "../../hook/useTranslate";
import {useRouter} from "next/router";


const FlexBox = styled.div`
  display: ${({ display }) => display || "flex"};
  flex-direction: ${({ fDirection }) => fDirection || "row"};
  flex-wrap: ${({ wrap }) => wrap || "wrap"};
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
  padding: ${({ padding }) => padding || "0"};
  margin: ${({ margin }) => margin || "0"};
  width: ${({ width }) => width || "auto"};
`;

export default function PrivacyPolicy() {
    const [isActive, setIsActive] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const lang = searchParams?.get("lang")
    const { width } = useWindowSize();
const  router = useRouter()
    let titles = [
        "privacy_policy.our_services",
        "privacy_policy.intellectual_property_rights",
        "privacy_policy.user_registration",
        "privacy_policy.prohibited_activities",
        "privacy_policy.third_party_links",
        "privacy_policy.advertisements",
        "privacy_policy.mobile_application_license",
        "privacy_policy.third_party_websites_content",
        "privacy_policy.advertisers",
        "privacy_policy.services_management",
        "privacy_policy.privacy_policy",
        "privacy_policy.term_termination",
        "privacy_policy.modifications_interruptions",
        "privacy_policy.modifications_interruptions",
        "privacy_policy.dispute_resolution",
        "privacy_policy.corrections",
        "privacy_policy.disclaimer",
        "privacy_policy.limitations_liability",
        "privacy_policy.indemnification",
        "privacy_policy.user_data",
        "privacy_policy.electronic_communications"

    ];


    const [heights, setHeights] = useState([]);
    const elementsRef = useRef(titles.map(() => createRef()));

    useEffect(() => {
        const nextHeights = elementsRef.current.map((ref) => ref);
        setHeights(nextHeights);
    }, []);

    const scrollTo = (i) => {
        setIsActive(i);
        console.log(heights)
        if (heights[i] && heights[i].current) {
            heights[i].current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };
    return (
        <div className='privacy-page'>
            <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                <h1 className='title montserrat' style={{marginRight: 10,cursor: 'pointer'}} onClick={(e)=>{
                    e.preventDefault()
                    router.back()
                }}>OOrmia |</h1>
                <h1 className='title montserrat'>Privacy policy</h1>
            </div>
            <Container maxWidth={"xl"}>
                <Stack justifyContent={"space-between"} minHeight={'100vh'}>
                    <Box>
                        <Box >
                            <FlexBox
                                width={"100%"}
                                wrap={"nowrap"}
                                align={"flex-start"}
                                justify={width > 1000 ? "space-between" : "flex-start"}>
                                <Box
                                    flex={1}
                                    position={"sticky"}
                                    top={"10px"}
                                    align={"flex-start"}
                                    flexDirection={"column"}
                                    margin={"0 10px 0 30px"}
                                    sx={{
                                        display: {xs: 'none', sm: 'none', md: 'flex'},
                                        '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }}>
                                    {[...titles].map((title, i) => (
                                        <Typography
                                            key={i}
                                            onClick={() => scrollTo(i)}
                                            space={"nowrap"}
                                            variant={"h6"}
                                            margin={"0 0 5px 0"}
                                            fontWeight={'bold'}
                                            color={isActive === i ? "#FFC212" : "white"}
                                            >
                                            <FormattedMessage id={title}/>
                                        </Typography>
                                    ))}
                                </Box>
                                <FlexBox  width={"770px"}>
                                    {[...titles].map((title, i) => (
                                        <Box
                                            justify={"flex-start"}
                                            align={"flex-start"}
                                            padding={width < 640 ? "15px" : "45px"}
                                            backgroundColor={"#FFFFFF"}
                                            borderRadius={"12px"}
                                            margin={"0 0 30px 0"}
                                            flexDirection={"column"}>
                                            <div ref={elementsRef.current[i]}/>
                                            <Typography fontW={700} variant={"h4"}>
                                                <FormattedMessage id={title}/>
                                            </Typography>
                                            <Typography
                                                margin={"30px 0 0 0"}
                                                size={"14px"}
                                                variant={"p"}>
                                                <FormattedMessage id={`${title}.content`}/>
                                            </Typography>
                                        </Box>
                                    ))}
                                </FlexBox>

                            </FlexBox>
                        </Box>

                    </Box>
                    <Divider
                        style={{marginBottom: '10px', marginTop: '20px', width: '632px'}}/>
                </Stack>
            </Container>
        </div>
    );
}

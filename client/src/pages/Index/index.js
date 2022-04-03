import React from 'react';
import Page from '../../components/Page';
import Carousel from '../../components/Carousel';
import CutOffContainer from '../../components/CutOffContainer';
import Footer from '../../components/Footer';
import { ScrollToTopCTADefault } from '../../components/ScrollToTopCTA';
import { TopSection, MiddleSection, InfoSection, BottomSection, ButtonCTA } from './IndexElements';
import dev_focus from '../../images/dev_focus.svg';
import browsing_online from '../../images/browsing_online.svg';
import quick_chat from '../../images/quick_chat.svg';

const Index = () => {
    return (
        <Page>
            <ScrollToTopCTADefault showBellow={100} />
            <CutOffContainer color="var(--bg-primary)" height="500px" botCutOut={true}>
                <TopSection>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 890.21488 504.94824"><rect x="374.69009" y="0.99996" width="514.52479" height="334.28522" fill="#fff" />
                        <path d="M1045.10744,533.811H528.58254V197.52588h516.5249Zm-514.5249-2h512.5249V199.52588H530.58254Z" transform="translate(-154.89256 -197.52588)" fill="#e4e4e4" /><path d="M754.50963,231.22089c15.11286.25809,15.1105,22.73818-.00048,22.99407C739.39677,253.95688,739.39914,231.47679,754.50963,231.22089Z" transform="translate(-154.89256 -197.52588)" fill="#3f3d56" /><path d="M786.84505,231.22089c15.11286.25809,15.11049,22.73818-.00049,22.99407C771.73219,253.95688,771.73456,231.47679,786.84505,231.22089Z" transform="translate(-154.89256 -197.52588)" fill="#6c63ff" /><path d="M819.18047,231.22089c15.11286.25809,15.11049,22.73818-.00049,22.99407C804.06761,253.95688,804.07,231.47679,819.18047,231.22089Z" transform="translate(-154.89256 -197.52588)" fill="#cacaca" /><rect x="463.56257" y="121.72687" width="102.90499" height="1.24733" fill="#cacaca" /><path d="M955.85864,500.116H814.28639V367.89873H955.85864Zm-140.325-1.24733H954.61126V369.14606H815.53373Z" transform="translate(-154.89256 -197.52588)" fill="#cacaca" /><rect x="884.44867" y="338.03315" width="1.24771" height="191.94847" transform="translate(-191.00497 587.38621) rotate(-46.97487)" fill="#cacaca" /><rect x="789.09831" y="433.38356" width="191.94845" height="1.24771" transform="translate(-213.00178 523.05438) rotate(-43.02234)" fill="#cacaca" /><path d="M955.85864,301.7901H617.83145V278.71443H955.85864Zm-336.77985-1.24733H954.61134v-20.581H619.07879Z" transform="translate(-154.89256 -197.52588)" fill="#cacaca" /><path d="M742.85864,403.7901H618.83145V380.71443H742.85864Zm-122.77985-1.24733H741.61134v-20.581H620.07879Z" transform="translate(-154.89256 -197.52588)" fill="#cacaca" /><path d="M742.85864,442.7901H618.83145V419.71443H742.85864Zm-122.77985-1.24733H741.61134v-20.581H620.07879Z" transform="translate(-154.89256 -197.52588)" fill="#cacaca" /><path d="M742.85864,481.7901H618.83145V458.71443H742.85864Zm-122.77985-1.24733H741.61134v-20.581H620.07879Z" transform="translate(-154.89256 -197.52588)" fill="#cacaca" /><path d="M651.31247,347.84605H618.04733c2.56789-10.33416,2.25807-21.51354,0-33.26514h33.26514A41.35224,41.35224,0,0,0,651.31247,347.84605Z" transform="translate(-154.89256 -197.52588)" fill="#6c63ff" /><rect x="468.1949" y="124.11127" width="20.16068" height="4.03214" fill="#fff" /><rect x="468.1949" y="132.17553" width="20.16068" height="4.03214" fill="#fff" /><rect x="468.1949" y="140.23982" width="20.16068" height="4.03214" fill="#fff" /><path d="M901.81932,398.08319H868.55418c2.56789-10.33415,2.25808-21.51353,0-33.26513h33.26514A41.35222,41.35222,0,0,0,901.81932,398.08319Z" transform="translate(-154.89256 -197.52588)" fill="#6c63ff" /><rect x="718.70176" y="174.34841" width="20.16068" height="4.03214" fill="#fff" /><rect x="718.70176" y="182.41268" width="20.16068" height="4.03214" fill="#fff" /><rect x="718.70176" y="190.47695" width="20.16068" height="4.03214" fill="#fff" /><path d="M944.58874,326.80076H911.32361c2.56788-10.33416,2.25807-21.51354,0-33.26514h33.26513A41.35257,41.35257,0,0,0,944.58874,326.80076Z" transform="translate(-154.89256 -197.52588)" fill="#6c63ff" /><rect x="761.47122" y="103.06598" width="20.16068" height="4.03214" fill="#fff" /><rect x="761.47122" y="111.13024" width="20.16068" height="4.03214" fill="#fff" /><rect x="761.47122" y="119.19453" width="20.16068" height="4.03214" fill="#fff" /><path d="M361.491,350.97412h-57v-30.5a28.5,28.5,0,0,1,57,0Z" transform="translate(-154.89256 -197.52588)" fill="#2f2e41" /><polygon points="232.043 492.792 244.302 492.792 250.135 445.504 232.041 445.505 232.043 492.792" fill="#ffb6b6" /><path d="M383.80792,686.31539l24.144-.001h.001a15.38728,15.38728,0,0,1,15.38648,15.38623v.5l-39.53076.00146Z" transform="translate(-154.89256 -197.52588)" fill="#2f2e41" /><polygon points="85.489 476.431 96.165 482.458 124.493 444.147 108.736 435.252 85.489 476.431" fill="#ffb6b6" /><path d="M239.62645,668.93413l21.02514,11.86922.00085.00048a15.38731,15.38731,0,0,1,5.83414,20.96288l-.24582.4354-34.42415-19.43345Z" transform="translate(-154.89256 -197.52588)" fill="#2f2e41" /><path d="M318.7352,477.64668l-.94608,4.73044s-2.83825,2.83825-1.41913,4.25738.94609,8.04172.94609,8.04172c-.7937,12.07594-16.57267,79.93554-19.39476,93.18936,0,0-21.76,14.19128-38.78949,42.10077s-17.50256,35.00513-17.50256,35.00513l18.92169,8.04174,47.30425-57.23815s13.24519-8.04175,17.97561-15.13739,34.05907-80.41724,34.05907-80.41724l16.55649,76.63287s-.94608,27.90949,3.31131,45.88513a192.52086,192.52086,0,0,1,4.73041,34.53211l22.233-2.36524s-1.41913-67.172-3.78433-74.2677c0,0,9.9339-81.83636-9.9339-114.47628L376.991,443.47412l-15.682-6.03618Z" transform="translate(-154.89256 -197.52588)" fill="#2f2e41" /><path d="M332.69863,299.42967c29.84706.50973,29.84238,44.90667-.001,45.412C302.85156,344.332,302.85624,299.93508,332.69863,299.42967Z" transform="translate(-154.89256 -197.52588)" fill="#ffb8b8" /><path d="M355.66774,320.95752h-5.07251l-1.38134-3.45361.69067,3.45361H322.16042l.90283-7.22656-6.74414,7.22656h-6.72729v-3.916a23.038,23.038,0,1,1,46.07592,0Z" transform="translate(-154.89256 -197.52588)" fill="#2f2e41" /><path d="M363.4744,358.1045l-56.40467.45658,11.92126,120.913s65.95917-3.48105,66-23.61394l-6.17935-17.89091Z" transform="translate(-154.89256 -197.52588)" fill="#e4e4e4" /><path id="a921541c-c001-4299-8f7c-75c007cac120" data-name="Path 138" d="M468.44536,569.08545,271.824,609.803c-2.01069.41105-4.3295-2.58308-5.18388-6.69591l-20.66643-99.79626c-.85164-4.11253.09011-7.78095,2.09833-8.204l196.62132-40.71755c2.01069-.411,4.32951,2.58308,5.18388,6.6959l20.66625,99.79538C471.39259,564.99366,470.4513,568.66466,468.44536,569.08545Z" transform="translate(-154.89256 -197.52588)" fill="#fff" /><g id="a63949a2-a794-48d0-a35a-8c12e4616a27" data-name="Group 38"><circle id="bdfdee77-367c-420e-9119-e33862087a46" data-name="Ellipse 7" cx="164.59544" cy="323.99779" r="17.55831" fill="#f0f0f0" /><path id="f21c0c69-10dc-4e04-b124-1a0d4dcadc3b" data-name="Path 63" d="M384.377,563.341l-84.34547,17.46678a1.76273,1.76273,0,0,1-.32015.03954l25.58424-77.35792a2.85168,2.85168,0,0,1,4.862-1.00684L366.532,543.30793l1.74268,1.95262Z" transform="translate(-154.89256 -197.52588)" fill="#e4e4e4" /><path id="a63814cd-9c0a-4ddf-af41-edb1ac5f3322" data-name="Path 65" d="M431.33785,553.6169l-72.95246,15.10745,9.88384-23.46.71089-1.68986,12.87976-30.57392a3.80656,3.80656,0,0,1,5.46857-1.47684,3.39828,3.39828,0,0,1,.33359.2753Z" transform="translate(-154.89256 -197.52588)" fill="#e4e4e4" /></g><path id="e00a8b63-2679-46d7-8caf-93b6261f662d" data-name="Path 138" d="M468.44536,569.08545,271.824,609.803c-2.01069.41105-4.3295-2.58308-5.18388-6.69591l-20.66643-99.79626c-.85164-4.11253.09011-7.78095,2.09833-8.204l196.62132-40.71755c2.01069-.411,4.32951,2.58308,5.18388,6.6959l20.66625,99.79538C471.39259,564.99366,470.4513,568.66466,468.44536,569.08545ZM248.68912,498.08666c-1.20627.2498-1.76856,2.45492-1.25933,4.92259L268.096,602.80468c.51095,2.46732,1.90387,4.26487,3.11072,4.01762l196.62133-40.71756c1.20627-.2498,1.76873-2.45409,1.25933-4.92259l-20.66624-99.79538c-.51095-2.46732-1.90387-4.26487-3.11073-4.01762Z" transform="translate(-154.89256 -197.52588)" fill="#cacaca" /><path d="M410.27276,476.71558a9.37695,9.37695,0,0,1-3.67316-13.90137l-11.42228-18.12982,9.32448-9.62842,15.77087,25.82937a9.42779,9.42779,0,0,1-9.99991,15.83024Z" transform="translate(-154.89256 -197.52588)" fill="#ffb6b6" /><path d="M354.80786,362.86649l8.18313-5.39237s6.31465,1.41565,13.0311,14.33421S409.82322,442.48,409.82322,442.48l-11.13274,11.3028L368.991,408.47412Z" transform="translate(-154.89256 -197.52588)" fill="#e4e4e4" /><path d="M304.65565,491.16332a9.377,9.377,0,0,0-2.70495-14.12174l2.45085-21.28737-12.573-4.6445-3.03886,30.1105a9.42779,9.42779,0,0,0,15.866,9.94311Z" transform="translate(-154.89256 -197.52588)" fill="#ffb6b6" /><path d="M314.491,368.97412l-7.42126-10.3728s-5.07874-1.1272-11.07874,5.8728-9.5,94.5-9.5,94.5l22,5,13-62Z" transform="translate(-154.89256 -197.52588)" fill="#e4e4e4" /><path d="M536.89256,702.47412h-381a1,1,0,0,1,0-2h381a1,1,0,0,1,0,2Z" transform="translate(-154.89256 -197.52588)" fill="#cacaca" /><path d="M291.74681,521.52578,259.207,528.43467c.36558-10.64214-2.25935-21.5134-6.90889-32.53977l32.53977-6.90889A41.35261,41.35261,0,0,0,291.74681,521.52578Z" transform="translate(-154.89256 -197.52588)" fill="#6c63ff" /><rect x="258.89285" y="499.61291" width="20.16068" height="4.03214" transform="translate(-253.21153 -130.72408) rotate(-11.98711)" fill="#fff" /><rect x="260.56773" y="507.50133" width="20.16068" height="4.03214" transform="translate(-254.81337 -130.20421) rotate(-11.98711)" fill="#fff" /><rect x="262.24262" y="515.38976" width="20.16068" height="4.03214" transform="translate(-256.41521 -129.68433) rotate(-11.98711)" fill="#fff" />
                    </svg>
                    <h1>The Coding Forum for the Modern Era</h1>
                    <h2>Connect with the community and discuss for free</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-90 0 512 512" fill="currentColor">
                        <path d="m166.238281 430.144531-89.769531-94.898437 29.058594-27.488282 60.632812 64.097657 60.273438-64.058594 29.132812 27.410156zm165.761719-38.144531v-272c0-66.167969-53.832031-120-120-120h-92c-66.167969 0-120 53.832031-120 120v272c0 66.167969 53.832031 120 120 120h92c66.167969 0 120-53.832031 120-120zm-120-352c44.113281 0 80 35.886719 80 80v272c0 44.113281-35.886719 80-80 80h-92c-44.113281 0-80-35.886719-80-80v-272c0-44.113281 35.886719-80 80-80zm-46 41c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 80c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 80c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20 20-8.953125 20-20-8.953125-20-20-20zm0 0" />
                    </svg>
                </TopSection>
            </CutOffContainer>
            <MiddleSection>
                <Carousel color={"var(--text-tertiary)"}>
                    <div>
                        <h2>A forum focused on developers</h2>
                        <h3>From students to world class programmers, all in one place.</h3>
                    </div>
                    <img src={dev_focus} alt="Person looking at the laptop" />
                    <div>
                        <h2>A journey full of exploration awaits</h2>
                        <h3>Hunders of thousands of discussions and milions of line of code, waiting for you.</h3>
                    </div>
                    <img src={browsing_online} alt="Person looking at posts like browsing" />
                    <div>
                        <h2>A place to keep in touch</h2>
                        <h3>A fun community thriving for knowledge. Message your future or current coworkers and friends.</h3>
                    </div>
                    <img src={quick_chat} alt="Bird next to chat messages" />
                </Carousel>
                <InfoSection>
                    <h2>A forum focused on developers</h2>
                    <h3>From students to world class programmers, all in one place.</h3>
                    <img src={dev_focus} alt="Person looking at the laptop" />
                </InfoSection>
                <InfoSection>
                    <h2>A journey full of exploration awaits</h2>
                    <h3>Hunders of thousands of discussions and milions of line of code, waiting for you.</h3>
                    <img src={browsing_online} alt="Person looking at posts like browsing" />
                </InfoSection>
                <InfoSection>
                    <h2>A place to keep in touch</h2>
                    <h3>A fun community thriving for knowledge. Message your future or current coworkers and friends.</h3>
                    <img src={quick_chat} alt="Bird next to chat messages" />
                </InfoSection>
            </MiddleSection>
            <BottomSection>
                <h2>Create an account now!</h2>
                <ButtonCTA to="/auth/register">Get Started</ButtonCTA>
            </BottomSection>
            <Footer />
        </Page>
    )
}

export default Index;
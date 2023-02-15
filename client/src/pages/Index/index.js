import React from 'react';
import Page from '../../components/Page';
import Carousel from '../../components/Carousel';
import CutOffContainer from '../../components/CutOffContainer';
import Footer from '../../components/Footer';
import { ScrollToTopCTADefault } from '../../components/ScrollToTopCTA';

import { TopSection, MiddleSection, InfoSection, BottomSection, ButtonCTA } from './IndexElements';

import { ReactComponent as DevFocusSvg } from '../../images/dev_focus.svg';
import { ReactComponent as BrowsingOnlineSvg } from '../../images/browsing_online.svg';
import { ReactComponent as QuickChatSvg }  from '../../images/quick_chat.svg';
import { ReactComponent as DesignFeedBackSvg } from '../../images/design_feedback.svg';
import { ReactComponent as ScrollSvg } from '../../images/scroll.svg';

const Index = () => {
    return (
        <Page>
            <ScrollToTopCTADefault showBellow={100} />
            <CutOffContainer color="var(--bg-primary)" height="500px" botCutOut={true}>
                <TopSection>
                    <DesignFeedBackSvg/>
                    <h1>The Coding Forum for the Modern Era</h1>
                    <h2>Connect with the community and discuss for free</h2>
                    <ScrollSvg/>
                </TopSection>
            </CutOffContainer>
            <MiddleSection>
                <Carousel color={"var(--text-tertiary)"}>
                    <div>
                        <h2>A forum focused on developers</h2>
                        <h3>From students to world class programmers, all in one place.</h3>
                    </div>
                    <DevFocusSvg/>
                    <div>
                        <h2>A journey full of exploration awaits</h2>
                        <h3>Hunders of thousands of discussions and milions of line of code, waiting for you.</h3>
                    </div>
                    <BrowsingOnlineSvg/>
                    <div>
                        <h2>A place to keep in touch</h2>
                        <h3>A fun community thriving for knowledge. Message your future or current coworkers and friends.</h3>
                    </div>
                    <QuickChatSvg/>
                </Carousel>
                <InfoSection>
                    <h2>A forum focused on developers</h2>
                    <h3>From students to world class programmers, all in one place.</h3>
                    <DevFocusSvg/>
                </InfoSection>
                <InfoSection>
                    <h2>A journey full of exploration awaits</h2>
                    <h3>Hunders of thousands of discussions and milions of line of code, waiting for you.</h3>
                    <BrowsingOnlineSvg/>
                </InfoSection>
                <InfoSection>
                    <h2>A place to keep in touch</h2>
                    <h3>A fun community thriving for knowledge. Message your future or current coworkers and friends.</h3>
                    <QuickChatSvg/>
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
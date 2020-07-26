import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, getAuthLoading } from '../redux/reducers/authReducer';
import { sendLoginAction } from '../redux/actions/authActions';
// import { Button, TextField } from '@material-ui/core';
import './_styles/dashboard.scss';
import { DashboardProps, DashboardStates, DashboardFuncTypes } from './_types/Dashboard.types';
import { SideBar } from '../components/Sidebar';
import { Icon } from '@material-ui/core';
import { ContentCard } from '../components/common/ContentCard';
import PreviousProjects from '../components/PreviousProjects';
import ProjectVersionPopUp from './preprocessing/ProjectVersionPopUp';

const MENU_ITEMS = [
    {
        icon: 'fa-history',
        title: 'PREVIOUS PROJECTS'
    },
    {
        icon: 'fa-arrow-right',
        title: 'NEXT PROJECTS'
    },
    // {
    //     icon: 'fa-check',
    //     title: 'CHECK RESULTS'
    // },
    // {
    //     icon: 'fa-paw',
    //     title: 'MENU ITEM'
    // }
];

const MOCKED_PREVIOUS_PROJECTS = [];

export class Dashboard extends React.Component<DashboardProps, DashboardStates> implements DashboardFuncTypes {
    state = {
        open: true,
        active: 0,
        showProjectVersionPopUps: false,
    }

    changeState = (key, val) => {
        this.setState<never>({ [key]: val });
    }

    toggleSideBar = () => {
        this.changeState('open', !this.state.open);
    }

    onStartNewProject = () => {
        this.props.history.push('/newproject');
    }



    render() {
        return (
            <div>
                <SideBar
                    items={MENU_ITEMS}
                    active={this.state.active}
                    open={this.state.open}
                    onClose={this.toggleSideBar}
                    onMenuItemSelected={console.log}
                    onStartNewProject={this.onStartNewProject}
                ></SideBar>
                <Icon
                    className="fa fa-bars"
                    onClick={this.toggleSideBar}
                />
                <div
                    className={`content content_${this.state.open ? 'openSidebar' : 'closedSideBar'}`}
                >
                    <ContentCard
                        title="PREVIOUS PROJECTS"
                        style={{
                            height: '100%',
                            maxHeight: '83vh',
                            paddingLeft: 0,
                            paddingRight: 0,
                            width: 'unset',
                        }}
                    >
                        <PreviousProjects
                            projects={MOCKED_PREVIOUS_PROJECTS}
                            openVersionPopUp={(id: string) => this.setState({ showProjectVersionPopUps: true })}
                        />
                    </ContentCard>
                </div>
                {this.state.showProjectVersionPopUps && (
                    <ProjectVersionPopUp
                        title="My first project"
                        onClose={() => this.setState({ showProjectVersionPopUps: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: getUser(state),
    isLoading: getAuthLoading(state),
})

const mapDispatchToProps = (dispatch) => ({
    sendLoginAction: bindActionCreators(sendLoginAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, getAuthLoading } from '../redux/reducers/authReducer';
import { fetchAuthData } from '../redux/actions/authActions';
// import { Button, TextField } from '@material-ui/core';
import './styles/dashboard.scss';
import { DashboardProps, DashboardStates, DashboardFuncTypes } from './types/Dashboard.types';
import { SideBar } from '../components/Sidebar';
import { Icon } from '@material-ui/core';
import { ContentCard } from '../components/common/ContentCard';
import EnhancedTable from '../components/DataTable/DataTable';
// import PreviousProjects from '../components/PreviousProjects';

const MENU_ITEMS = [
    {
        icon: 'fa-history',
        title: 'PREVIOUS PROJECTS'
    },
    {
        icon: 'fa-arrow-right',
        title: 'NEXT PROJECTS'
    },
    {
        icon: 'fa-check',
        title: 'CHECK RESULTS'
    },
    {
        icon: 'fa-paw',
        title: 'MENU ITEM'
    }
];

// const MOCKED_PREVIOUS_PROJECTS = [];

export class Dashboard extends React.Component<DashboardProps, DashboardStates> implements DashboardFuncTypes {
    state = {
        open: false,
        active: 0,
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
                    {/* <ContentCard
                        title="PREVIOUS PROJECTS"
                    >
                        <PreviousProjects
                            projects={MOCKED_PREVIOUS_PROJECTS}
                        />
                    </ContentCard> */}
                    <ContentCard
                        title="DUMMY TABLE"
                    >
                        <EnhancedTable />
                    </ContentCard>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: getUser(state),
    isLoading: getAuthLoading(state),
})

const mapDispatchToProps = (dispatch) => ({
    fetchAuthData: bindActionCreators(fetchAuthData, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

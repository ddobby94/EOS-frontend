import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ImportPageProps } from '../_types/Project.types';
import ContentCard from '../../components/common/ContentCard';
import { TextField, Icon, Button } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { setProjectTitle } from '../../redux/actions/projectActions';
import '../_styles/project.scss';

export const Import: React.FunctionComponent<ImportPageProps> = ({ setNextButtonAvailability, onProjectNameChange, projectTitle }) => {
    const [datasetName, setDataSetName] = useState<string>('');

    const onChangeHandler = (changeFunction, e) => {
        changeFunction(e.target.value);
    };

    const projectNameChange = (e) => {
        const name = e.target.value;
        onProjectNameChange(name);
        setNextButtonAvailability(name.length < 3);
    }

    const dropHandler = (ev) => {
        console.log('File(s) dropped');

        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
                if (ev.dataTransfer.items[i].kind === 'file') {
                    var file = ev.dataTransfer.items[i].getAsFile();
                    console.log('... file[' + i + '].name = ' + file.name);
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (var i = 0; i < ev.dataTransfer.files.length; i++) {
                console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
            }
        }
      }

    return (
        <ContentCard
            title="IMPORT DATASET"
        >
            <div className="import-container">
                <div className="import-inputContainer">
                    <TextField
                        className="import-input"
                        label="Project Name"
                        variant="outlined"
                        value={projectTitle}
                        onChange={projectNameChange}
                        />
                    <TextField
                        className="import-input"
                        label="Dataset Name"
                        variant="outlined"
                        value={datasetName}
                        onChange={(e) => onChangeHandler(setDataSetName, e)}
                    />
                </div>
                <div
                    onDrop={dropHandler}
                    className="import-uploadContainer"
                >
                    <Icon
                        className="fa fa-cloud-upload import-cloudIcon"
                    />
                    <h3>Drop your files here</h3>
                    <Button
                        variant="outlined"
                        color="primary"
                        children="BROWSE FILES"
                        className="import-filesBtn"
                        onClick={console.log}
                    />
                </div>
            </div>

        </ContentCard>
    );
};


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    setProjectTitle: bindActionCreators(setProjectTitle, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Import);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ImportPageProps } from '../_types/Project.types';
import ContentCard from '../../components/common/ContentCard';
import { TextField, Icon, Button } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { setSelectedFile } from '../../redux/actions/projectActions';
import '../_styles/project.scss';
import { isActiveClassName } from '../../utils/stylingHelpers';
import { getSelectedFile } from '../../redux/reducers/projectReducer';

const ALLOWED_FILE_TYPES_CHECKER = {
    xls: '.xls',
    xlsx: '.xlsx',
    txt: '.txt',
    csv: '.csv',
};

export const ImportDataSet: React.FunctionComponent<ImportPageProps> = ({
    setNextButtonAvailability,
    onProjectNameChange,
    projectTitle,
    selectedFile,
    setSelectedFile: setSelectedFileStore,
}) => {
    const [datasetName, setDataSetName] = useState<string>('');
    const [dragEventCounter, setDragEventCounter] = useState<number>(0);

    useEffect(() => {
        // TODO setNextButtonAvailability check
        setNextButtonAvailability(!!selectedFile && projectTitle.length > 3);
    });

    const onChangeHandler = (changeFunction, e) => {
        changeFunction(e.target.value);
    };

    const projectNameChange = (e) => {
        const name = e.target.value;
        onProjectNameChange(name);
        setNextButtonAvailability(name.length < 3);
    }

    const dropHandler = (ev) => {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();

        const setActiveFile = (file: File) => {
            const typeFromName = file.name.split('.').slice(-1)[0];

            if (ALLOWED_FILE_TYPES_CHECKER[typeFromName]) {
                setSelectedFileStore(file);
            } else {
                window.alert(`File type ".${typeFromName}" not allowed!`);
            }
        }

        if (ev.dataTransfer.items) {
            // If dropped items aren't files, reject them
            if (ev.dataTransfer.items[0].kind === 'file') {
                setActiveFile(ev.dataTransfer.items[0].getAsFile())
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            if (ev.dataTransfer.files[0]) {
                setActiveFile(ev.dataTransfer.files[0])
            }
        }

        setDragEventCounter(0);
    }

    // TODO add throttle / debounce
    const onDragOver = (e: React.DragEvent) => {
        // setFilesDraggedOver(true);
        e.preventDefault();
    };

    const onDragEnter = (e: React.DragEvent) => {
        setDragEventCounter(dragEventCounter + 1);
        e.preventDefault();
    }

    const onDragLeave = (e: React.DragEvent) => {
        setDragEventCounter(dragEventCounter - 1);
        e.preventDefault();
    }

    const onFileSelected = (event) => {
        const file: File = event.target.files[0];
        setSelectedFileStore(file);
    }

    const openChooseFile = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = Object.values(ALLOWED_FILE_TYPES_CHECKER).join(', ');
        input.onchange = onFileSelected;

        input.click();
    }

    const getSelectedFile = (fileName: string) => (
        <div
            className="import-uploadContainer"
        >
            <Icon
                className="fa fa-check-circle import-selectedIcon"
            />
            <h3 className="import-selectedTitle">FILE SELECTED</h3>
            <div className="import-selectedFile">
                <p>{fileName}</p>
                <Icon
                    className="fa fa-times import-selectedRemove"
                    onClick={() => setSelectedFileStore(undefined)}
                />
            </div>
        </div>
    );

    const getFileUploadArea = () => (
        <div
            onDrop={dropHandler}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={(e) => onDragOver(e)}
            className={isActiveClassName(!!dragEventCounter, 'import-uploadContainer')}
        >
            <Icon
                className="fa fa-cloud-upload import-cloudIcon"
            />
                <h3>{!!dragEventCounter ? 'Release files' : 'Drop your files here'}</h3>
                <Button
                    variant="outlined"
                    color="primary"
                    children="BROWSE FILES"
                    className="import-filesBtn"
                    onClick={openChooseFile}
                />
        </div>
    );

    const getFileHandler = () => {
        if (selectedFile) {
            return getSelectedFile(selectedFile.name);
        } else {
            return getFileUploadArea();
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
                {getFileHandler()}
            </div>

        </ContentCard>
    );
};


const mapStateToProps = (s) => ({
    selectedFile: getSelectedFile(s),
});

const mapDispatchToProps = (dispatch) => ({
    setSelectedFile: bindActionCreators(setSelectedFile, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportDataSet);

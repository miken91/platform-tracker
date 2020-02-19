import React, {useContext, useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import {icons} from './Icons';
import axios from 'axios';
import ApplicationContext from "../../ApplicationContext";

function ModifyAssetComponent(props) {
    const context = useContext(ApplicationContext);
    const authStr = "Bearer ".concat(context.token);
    const [state, setState] = useState({columns: [], data: []});
    useEffect(() => {
        axios.get('https://platform-tracker.herokuapp.com/' + props.schema.path, {headers: {Authorization: authStr}}).then(result => {
            const columns = [];
            Object.keys(props.schema.properties).forEach((key) => {
                let newColumn = {}
                newColumn['title'] = key;
                newColumn['field'] = key;
                if (key === 'id') {
                    newColumn['editable'] = 'never';
                } else if (key.includes('Date')) {
                    newColumn['editable'] = 'never';
                    newColumn['type'] = 'date'
                } else if (key === 'activeSw') {
                    newColumn['type'] = 'boolean';
                }
                columns.push(newColumn)
            });
            const data = [];
            if(result.data.length > 0) {
                Object.entries(result.data).forEach((row) => {
                    let newRow = {};
                    Object.entries(row[1]).forEach(([columnName, columnVal]) => {
                        newRow[columnName.toString()] = columnVal
                    });
                    data.push(newRow);
                });
            }
            setState({columns: columns, data: Object.assign([], data)});
        })
    }, [props]);

    return (
        <React.Fragment>
            {
                !state ? null :
                    <MaterialTable
                        icons={icons}
                        title={"Perform maintenance on " + props.schema.title + " table."}
                        columns={state.columns}
                        data={state.data}
                        editable={{
                            onRowAdd: newData => axios.post('https://platform-tracker.herokuapp.com/' + props.schema.path, setUpPostReq(newData), {headers: {Authorization: authStr}})
                                .then(response => {
                                    if (response.status === 200)
                                        axios.get('https://platform-tracker.herokuapp.com/' + props.schema.path, {headers: {Authorization: authStr}}).then(response => {
                                                const getResData = [];
                                                Object.entries(response.data).forEach((row) => {
                                                    let newRow = {}
                                                    Object.entries(row[1]).forEach(([columnName, columnVal]) => {
                                                        newRow[columnName.toString()] = columnVal.toString();
                                                    });
                                                    getResData.push(newRow);
                                                });
                                                setState(prevState => {
                                                    let data = [...prevState.data];
                                                    data = getResData;
                                                    return {...prevState, data};
                                                })
                                            }
                                        )
                                }),
                            onRowUpdate: (newData, oldData) =>
                                axios.patch('https://platform-tracker.herokuapp.com/' + props.schema.path + '/' + oldData.id, checkFieldsToUpdate(newData, oldData), {headers: {Authorization: authStr}})
                                    .then(response => {
                                            if (response.status === 204) {
                                                if (oldData) {
                                                    setState(prevState => {
                                                        const data = [...prevState.data];
                                                        data[data.indexOf(oldData)] = newData;
                                                        return {...prevState, data};
                                                    });
                                                }
                                            }
                                        }
                                    ),
                            onRowDelete: oldData =>
                                axios.delete('https://platform-tracker.herokuapp.com/' + props.schema.path + '/' + oldData.id, {headers: {Authorization: authStr}})
                                    .then(response => {
                                        if (response.status === 204) {
                                            setState(prevState => {
                                                const data = [...prevState.data];
                                                data.splice(data.indexOf(oldData), 1);
                                                return {...prevState, data};
                                            });
                                        }
                                    })
                        }}
                    />
            }
        </React.Fragment>
    );
}

function checkFieldsToUpdate(newData, oldData) {
    let patchReq = {};
    Object.keys(newData).forEach((key) => {
        if (newData[key] !== oldData[key]) {
            patchReq[key] = newData[key];
        }
    });
    if (Object.entries(patchReq).length > 0) {
        patchReq['updateDate'] = new Date();
    }
    return patchReq;
}

function setUpPostReq(newData) {
    newData['createDate'] = new Date();
    newData['updateDate'] = new Date();
    return newData;
}

export default ModifyAssetComponent;
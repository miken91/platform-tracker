import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import {icons} from './Icons';
import axios from 'axios';


function ModifyAssetComponent(props) {
    const [state, setState] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:3001/' + props.schema.path,
            );
            const columns = [];
            Object.keys(result.data[0]).forEach((key) => {
                let newColumn = {}
                newColumn['title'] = key;
                newColumn['field'] = key;
                columns.push(newColumn)
            });
            const data = [];
            Object.entries(result.data).forEach((row) => {
                let newRow = {}
                Object.entries(row[1]).forEach(([columnName, columnVal]) => {
                    newRow[columnName.toString()] = columnVal.toString();
                });
                data.push(newRow);
            });
            setState({columns: columns, data: data});
        };
        fetchData();
    }, [props]);


    return (
        <React.Fragment>
            {
                !state ? null :
                    <MaterialTable
                        icons={icons}
                        title="Editable Example"
                        columns={state.columns}
                        data={state.data}
                        editable={{
                            onRowAdd: newData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        setState(prevState => {
                                            const data = [...prevState.data];
                                            data.push(newData);
                                            return {...prevState, data};
                                        });
                                    }, 600);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        if (oldData) {
                                            setState(prevState => {
                                                const data = [...prevState.data];
                                                data[data.indexOf(oldData)] = newData;
                                                return {...prevState, data};
                                            });
                                        }
                                    }, 600);
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        setState(prevState => {
                                            const data = [...prevState.data];
                                            data.splice(data.indexOf(oldData), 1);
                                            return {...prevState, data};
                                        });
                                    }, 600);
                                }),
                        }}
                    />
            }
        </React.Fragment>
    );
}

export default ModifyAssetComponent;
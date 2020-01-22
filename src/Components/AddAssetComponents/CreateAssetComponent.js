import React, {useEffect, useState} from 'react'
import {Button, FormControlLabel, FormGroup, Switch, TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

function CreateAssetComponent(props) {
    const [tab, setTab] = useState(props.tab);
    const [checked, setChecked] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const toggleChecked = () => {
        setChecked(prev => !prev);
    };
    const [postStatus, setPostStatus] = useState({status: '', message: ''});
    useEffect(() => {
        setTab(props.tab);
        setChecked(false);
        setName('');
        setDescription('');
        setPostStatus({status: '', message: ''})
    }, [props.tab]);

    const postData = () => {
        let data = {
            name: name,
            description: description,
            activeSw: checked,
            createDate: new Date(),
            updateDate: new Date()
        };
        setPostStatus({status: 'Fetching', message: 'Adding New ' + tab.category});
        fetch('http://127.0.0.1:3001/' + tab.route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((data) => {
            setPostStatus({status: 'Success', message: 'Successfully Added New ' + tab.category});
        });
    };

    function Banner(props) {
        if (props.postStatus.status === '') {
            return null;
        } else {
            return <Alert severity='success'>{props.postStatus.message}</Alert>
        }
    }
    return (
        <React.Fragment>
            <h4>Create new entry for {tab.category}</h4>
            <form>
                <FormGroup row={true}>
                    <TextField
                        label='Name'
                        value={name}
                        onChange={event => setName(event.target.value)}/>
                    <TextField
                        label='Description'
                        value={description}
                        onChange={event => setDescription(event.target.value)}/>
                    <FormControlLabel control={
                        <Switch
                            checked={checked}
                            onChange={toggleChecked}
                            value='checked'
                        />
                    } label={'Active'}/>
                    <Button variant='contained' onClick={postData}>Add {tab.category}</Button>
                </FormGroup>
            </form>
            <Banner postStatus={postStatus}/>
        </React.Fragment>
    )
}

export default CreateAssetComponent;
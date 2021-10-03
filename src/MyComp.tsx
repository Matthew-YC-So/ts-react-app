import React from 'react';
import './MyComp.css';
import MyForm from './profileForm'
import { Profile } from './AppTypes'


interface record { id: number; name: string }

function MyRow(props: { row: record }) {
    return (<tr>
        <td>{props.row.id}</td><td>{props.row.name}</td>
    </tr>);
}

function MyTable(props: { rows: record[] }) {

    return (
        <table>
            <thead><tr><th>ID</th><th>Name</th></tr></thead>
            <tbody>
                {props.rows.map(x => <MyRow row={x} key={x.id} />)}
            </tbody>
        </table>
    );

}

export default function MyComp() {

    var data = [{ id: 1, name: 'Matthew' }, { id: 2, name: 'Maggie' }];
    var profile: Profile = { firstName: 'Matthew', lastName: 'SO', bio: '', phone: '0901320973' };

    const onProfileChanged = (values: Profile) => {
        window.alert(JSON.stringify(values));
    };


    return (
        <div>
            <MyTable rows={data} />
            <MyForm profile={profile} onChange={onProfileChanged} />
        </div>
    );

}
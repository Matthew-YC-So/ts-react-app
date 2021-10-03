import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import './MyComp.css';
import MyForm from './profileForm';
import { Profile } from './AppTypes';
import { MEMBERS } from './Members';


function MyRow(props: { row: Profile, onClick: any, isActive:boolean }) {
    return (<tr className={props.isActive?"table-active":""}  >
        <td><Button variant="link" className="w-100" onClick={() => props.onClick(props.row.id)}>{props.row.id}</Button></td><td>{props.row.firstName},{props.row.lastName}</td><td>{props.row.bio}</td><td>{props.row.phone}</td>
    </tr>);
}

function MyTable(props: { rows: Profile[], onSelected: any, activeRow:number }) {

    return (
        <Table bordered responsive size="sm"  >
            <thead><tr><th>ID</th><th>Name</th><th>BIO</th><th>Phone</th></tr></thead>
            <tbody>
                {props.rows.map((x, index) => <MyRow row={x} key={x.id} onClick={(id: number) => props.onSelected(id)} isActive={ index === props.activeRow }  />)}
            </tbody>
        </Table>
    );

}

export default function MyComp() {

    const members = MEMBERS;
    const emptyProfile = { id: 0, firstName: '', lastName: '', bio: '', phone: '' };

    function getProfile(id: number) {
        if (id) {
            let mbr = members.find(m => m.id === id)
            if (mbr !== undefined)
                setProfile(mbr);
            else
                setProfile(emptyProfile);
        }
    }

    const currentProfile = members.length > 0 ? members[0] : emptyProfile;

    const [profile, setProfile] = useState(currentProfile);

    const onProfileChanged = (profile: Profile) => {
        // window.alert(JSON.stringify(profile));
        const nonModProfile = members.find(m => m.id === profile.id) ;
        const updatedProfile = { ...nonModProfile, ...profile };
        const keyIndex = members.findIndex(c => c.id === nonModProfile?.id);
        members[keyIndex] = updatedProfile;
        setProfile(updatedProfile);
    };

    let currentRowIndex = members.findIndex(c=>c.id === profile.id);

    return (
        <div>
            <MyTable rows={members} onSelected={(id: number) => getProfile(id)} activeRow={currentRowIndex}  />
            <MyForm profile={profile} onChange={onProfileChanged} />
        </div>
    );

}
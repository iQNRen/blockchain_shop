import { React, useEffect, useState } from 'react';
import { getAccount } from '../../store';
import { Avatar, Button, List, Skeleton } from 'antd';
// const count = 3;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const Users = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        localStorage.getItem('users') && setUsers(JSON.parse(localStorage.getItem('users')));
        console.warn('users', localStorage.getItem('users'));
        console.warn('users', users);
        setData(users);
        setList(users);
        let owner = getAccount();
        console.warn('owner', owner);
        console.warn('users', users);
        // users.filter((user) => user !== owner);
    }, [])


    return (
        <>
            <h2>用户列表</h2>
            <div style = {{ margin: '50px',border:'1px solid black', borderRadius:'10px',padding:"20px"}}>
                <List
                    itemLayout="horizontal"
                    dataSource={users}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                title={<a href="https://ant.design">{item}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                /></div>
        </>
    )
}

export default Users;


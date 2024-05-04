import { React, useEffect, useState } from 'react';
import { Avatar, List, Skeleton, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const Users = () => {
    const [shops, setShops] = useState([]);

    const [loading, setLoading] = useState(false);


    const loadMoreData = async () => {
        if (loading) {
            return;
        }

        localStorage.getItem('shops') && setShops(JSON.parse(localStorage.getItem('shops')));
        let data 
        if(localStorage.getItem('orders')){
            data = JSON.parse(localStorage.getItem('orders'));
        }

        setLoading(false);

        console.warn("????");
        console.warn(data);
    };
    useEffect(() => {
        loadMoreData();
    }, []);


    return (
        <>
            <h1>商品列表</h1>
            <div
                id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '30 16px',
                    border: '1px solid black',
                    borderRadius: '10px',
                    margin: '10px',
                }}
            >
                <InfiniteScroll
                    dataLength={shops.length}
                    next={loadMoreData}
                    hasMore={shops.length < 50}
                    loader={
                        <Skeleton
                            avatar
                            paragraph={{
                                rows: 1,
                            }}
                            active
                        />
                    }
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={shops}
                        renderItem={(item) => (
                            <List.Item key={item.email}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item[3]} />}
                                    title={item[1]}
                                    description={item[2]}
                                />
                                <div>Content</div>
                            </List.Item>
                        )
                        }
                        styles={{
                            margin: '10px',
                        }}
                    />
                </InfiniteScroll>
            </div>
        </>
    )
}

export default Users;


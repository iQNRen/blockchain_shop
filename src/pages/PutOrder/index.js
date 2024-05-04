import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { useNavigate} from "react-router-dom";

const PutOrder = () => {
    // const [provider, setProvider] = useState(null)
    // const [contract, setContract] = useState(null)
    const navigator = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
        localStorage.setItem("list", JSON.stringify(values));
        navigator("/Admin");
        window.location.reload()

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const loadBlockchainData = async () => {

    }
    useEffect(() => {
        loadBlockchainData();
    }, [])
    return (
        <>
            <div>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="category"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: '请选择商品类别',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value={"电子产品"}>电子产品</Radio>
                            <Radio value={"服装"}>服装</Radio>
                            <Radio value={"玩具"}>玩具</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品名称',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="image"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: '请输入图片，url',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="cost"
                        name="cost"
                        rules={[
                            {
                                required: true,
                                message: '请输入价格，ETH',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="rating"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: '请输入质量',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="stock"
                        name="stock"
                        rules={[
                            {
                                required: true,
                                message: '请输入库存',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};


export default PutOrder;
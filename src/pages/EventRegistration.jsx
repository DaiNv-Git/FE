import { Button, DatePicker, Form, Input, InputNumber } from "antd";

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const EventRegistration = () => {
    const onFinish = (values) => {
        console.log(values);
    };
    return (
        <div>
            <div className="form-shadow">
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name='title' label="Title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="time" label="Time">
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item name='description' label="Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default EventRegistration;
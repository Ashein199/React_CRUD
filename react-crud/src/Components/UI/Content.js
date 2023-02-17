import { useDispatch, useSelector } from "react-redux";

import { Layout, Card, Button } from "antd";
import { deleteUser, updateUser } from "../../store/user-slice";
import { message } from "antd";
import UserForm from "../User/UserForm";
import { Input, Form, Modal } from "antd";
import { useState } from "react";
const { Content } = Layout;

const MainContent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const showModal = (data) => {
    setSelectedCardData(data);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const update = (FormData) => {
    console.log(FormData);
    dispatch(updateUser({ ...FormData, id: selectedCardData.id }));
    setIsModalOpen(false);
    messageApi.open({
      type: "success",
      content: "User is updated",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const users = useSelector((state) => state.users.users);

  return (
    <Layout>
      {contextHolder}
      <UserForm />
      <Content
        style={{
          padding: "24px",
        }}
      >
        {users.map((user) => (
          <Card user={user} key={user.id}>
            <p>Name: {user.name} </p>
            <p>Email: {user.email}</p>
            <p>Phone Numer: {user.phone}</p>
            <Button
              onClick={() => {
                dispatch(deleteUser(user.id));
                messageApi.open({
                  type: "error",
                  content: "User Deleted",
                });
              }}
              danger
              size="middle"
            >
              delete
            </Button>

            <Button
              onClick={() =>
                showModal({
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                })
              }
            >
              Edit
            </Button>
            {isModalOpen && (
              <>
                <Modal
                  title="Change user information"
                  open={isModalOpen}
                  footer={null}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Form initialValues={selectedCardData} onFinish={update}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required: true,

                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Phone"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Confirm
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </>
            )}
          </Card>
        ))}
      </Content>
    </Layout>
  );
};

export default MainContent;

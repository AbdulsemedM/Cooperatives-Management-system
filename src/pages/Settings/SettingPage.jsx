import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  // Checkbox,
  Form,
  Header,
  Icon,
  Input,
  // Label,
  Menu,
  Segment,
} from "semantic-ui-react";
import { selectUserProfile } from "../../redux/user/userSelector";
import { createStructuredSelector } from "reselect";
import { connect, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { API } from "../../utils/API";
import { addressInfo } from "../../constant/address";
import {
  setPrCooperativeId,
  setRefreshToken,
  setRole,
  setToken,
  setUnionId,
  setUserProfile,
} from "../../redux/user/userAction";
import {
  setActiveSidebarTab,
  setHiddenSidebar,
} from "../../redux/state-control/stateAction";
import { useNavigate } from "react-router-dom";

const SettingsPage = ({ profileInfo, setProfile }) => {
  const [activeSettingTab, setActiveSettingTab] = useState("Profile");
  const [zone, setZone] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);
  let timerInterval;
  const Alert = (message, icon) => {
    MySwal.fire({
      icon: icon,
      position: "top-end",
      html: message ? message : "message not returned",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  };

  const [data, setData] = useState({
    fullName: "",
    username: "",
    address: {
      region: "",
      zone: "",
      woreda: "",
      town: "",
      kebele: "",
      email: "",
      phoneNumber: "",
    },
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // console.log(profileInfo);
    profileInfo &&
      setData({
        username: profileInfo?.username,
        fullName: profileInfo?.fullName,
        address: {
          region: profileInfo?.address?.region,
          zone: profileInfo?.address?.zone,
          woreda: profileInfo?.address?.woreda,
          town: profileInfo?.address?.town,
          kebele: profileInfo?.address?.kebele,
          email: profileInfo?.address?.email,
          phoneNumber: profileInfo?.address?.phoneNumber,
        },
      });
  }, [profileInfo]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData, //spread operator
      [name]: value,
    });
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data, //spread operator
      [name]: value,
    });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };
  useEffect(() => {
    let newZone = addressInfo
      .filter((item) => item.region === data.address.region)
      .map((item) => item?.zone[data.address.zone]);
    setZone(newZone);
  }, [data.address.zone, data.address.region]);

  const editUser = async (e) => {
    e.preventDefault();
    // console.log("password", data);
    try {
      const result = await API.put(
        `/users/editUser/${data?.username}`,
        data
      ).then((res) => {
        if (res.status === 200) {
          Alert("Updated Successfully", "success");
        } else {
          // console.log("failed");
          Alert("Failed to reset password", "error");
        }
        return res;
      });
      if (result.status === 200) {
        await API.get(`/users/getUserByPhone/${data.username}`, data).then(
          (res) => setProfile(res.data)
        );
      }
    } catch (error) {
      Alert("Something went wrong", "error");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    // console.log("password", data);
    try {
      await API.put(
        `/users/changePassword/${profileInfo?.username}/${passwordData?.currentPassword}`,
        passwordData
      ).then((res) => {
        if (res.status === 200) {
          Alert("Updated Successfully", "success");
          dispatch(setRole([]));
          dispatch(setPrCooperativeId(null));
          dispatch(setRefreshToken(""));
          dispatch(setToken(""));
          dispatch(setUnionId(""));
          dispatch(setActiveSidebarTab("dashboard"));
          dispatch(setHiddenSidebar(true));
          dispatch(setUserProfile({}));
          navigate(`/`);
        } else {
          // console.log("failed");
          Alert("Failed to reset password", "error");
        }
        return res;
      });
    } catch (error) {
      Alert("Something went wrong", "error");
    }
  };

  return (
    <div className="h-screen flex flex-row">
      <Menu vertical>
        <Menu.Item header>Settings</Menu.Item>
        <Menu.Item>
          <Menu.Header>Profile settings</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              className="cursor-pointer my-1 hover:text-cyan-500 hover:bg-cyan-500"
              onClick={() => setActiveSettingTab("Profile")}
            >
              <Icon name="user" />
              <span>Profile</span>
            </Menu.Item>
            <Menu.Item
              className="cursor-pointer my-1 hover:text-cyan-500 hover:bg-cyan-500"
              onClick={() => setActiveSettingTab("Password")}
            >
              <Icon name="key" />
              <span>Password</span>
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Menu>
      <div className="flex-1 py-2 px-4">
        <Header as="h2">{activeSettingTab}</Header>
        {activeSettingTab === "Profile" && (
          <Segment attached>
            <Form size="tiny" onSubmit={editUser}>
              <Form.Group widths="equal">
                <Form.Field>
                  <Form.Input
                    fluid
                    label="Full name"
                    name="fullName"
                    value={data.fullName}
                    onChange={handleProfileChange}
                    placeholder="Full name"
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    label="Username(Uneditable)"
                    name="username"
                    value={data?.username}
                    // onChange={handleProfileChange}
                    placeholder="Your name"
                    // disabled
                  />
                </Form.Field>
                <Form.Field>
                  {/* <label>Email</label> */}
                  <Form.Input
                    label="E-mail"
                    name="email"
                    value={data?.address?.email}
                    onChange={handleAddressChange}
                    placeholder="Your email"
                  />
                </Form.Field>
              </Form.Group>
              <div className="three fields">
                <div className="field">
                  <label className="label">Region</label>
                  <select
                    className="ui dropdown"
                    name="region"
                    value={data.address.region}
                    onChange={handleAddressChange}
                    required
                  >
                    <option></option>
                    {addressInfo.map((item, index) => (
                      <option key={index} value={item.region}>
                        {item.region}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="label">Zone</label>
                  <select
                    className="ui dropdown"
                    name="zone"
                    value={data.address.zone}
                    onChange={handleAddressChange}
                    disabled={data.address.region ? false : true}
                  >
                    <option></option>
                    {addressInfo
                      .filter((item) => item.region === data.address.region)
                      .map((item, index) => {
                        const keys = item.zone ? Object.keys(item?.zone) : "";
                        //   console.log(item?.zone["Bale"]);
                        return (
                          keys instanceof Array &&
                          keys?.map((key) => {
                            return (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            );
                          })
                        );
                      })}
                  </select>
                </div>
                <div className="field">
                  <label className="label">Woreda</label>
                  <select
                    className="ui dropdown"
                    name="woreda"
                    value={data.address.woreda}
                    onChange={handleAddressChange}
                    disabled={data.address.zone ? false : true}
                  >
                    <option></option>
                    {zone[0]?.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Town</label>
                  <Input
                    name="town"
                    value={data?.address?.town}
                    onChange={handleAddressChange}
                    placeholder="Town"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Kebele</label>
                  <Input
                    name="kebele"
                    value={data?.address?.kebele}
                    onChange={handleAddressChange}
                    placeholder="Kebele"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Phone Number</label>
                  <Input
                    name="phoneNumber"
                    value={data?.address?.phoneNumber}
                    onChange={handleAddressChange}
                    placeholder="Your Phone Number"
                  />
                  {/* </Form.Field> */}
                </Form.Field>
              </Form.Group>
              <Divider />
              <Button color="twitter">Save</Button>
            </Form>
          </Segment>
        )}
        {activeSettingTab === "Password" && (
          <Segment attached>
            <form className="ui form p-5" onSubmit={changePassword}>
              <div className="three fields">
                <div className="field">
                  <label htmlFor="fullName" className="label">
                    Old Password:
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    placeholder="Current Password"
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="password" className="label">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={passwordData.password}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="cpassword" className="label">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    id="cpassword"
                    name="confirmPassword"
                    value={passwordData?.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handlePasswordChange}
                    required
                  />
                  {passwordData?.confirmPassword === ""
                    ? ""
                    : passwordData.password !==
                        passwordData.confirmPassword && (
                        <span className="text-sm text-red-500">
                          Password not match
                        </span>
                      )}
                </div>
              </div>

              <div className="ui divider"></div>
              <div className="flex items-center justify-end my-5 ">
                <Button
                  disabled={
                    passwordData.password !== passwordData.confirmPassword
                  }
                  positive
                  type="submit"
                  style={{ backgroundColor: "#06B6D4" }}
                >
                  Change
                </Button>
              </div>
            </form>
          </Segment>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  profileInfo: selectUserProfile,
});
const mapDispatchToProps = (dispatch) => ({
  setProfile: (item) => dispatch(setUserProfile(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);

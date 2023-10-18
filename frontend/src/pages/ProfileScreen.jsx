import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../store/slices/usersApiSlice";
import { setCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ProfileScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { userInfo } = useSelector((state) => state.auth);

	const [updateProfile, { isLoading }] = useUpdateUserMutation();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name);
			setEmail(userInfo.email);
		}
	}, [userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword)
			return toast.error("Passwords don't match...");
		try {
			const response = await updateProfile({
				_id: userInfo._id,
				name,
				email,
				password,
			}).unwrap();
			dispatch(setCredentials({ ...response }));
			toast.success("Profile Is Updated...");
			navigate("..");
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	return (
		<FormContainer>
			<h1>Update Profile</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group className="my-2" controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className="my-2" controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className="my-2" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className="my-2" controlId="confirm-password">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</Form.Group>
				{isLoading && <Loader />}

				<Button
					type="submit"
					variant="primary"
					className="mt-3"
					disabled={isLoading}>
					Update Profile
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ProfileScreen;

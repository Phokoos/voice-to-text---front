import { Component } from "react";
import { nanoid } from "nanoid";

const INITIAL_STATE = {
  login: "",
  email: "",
  password: "",
  agreed: false,
  gender: null,
  age: "",
  file: null,
};

const Gender = {
  MALE: "male",
  FEMALE: "female",
};

class LoginForm extends Component {
  state = { ...INITIAL_STATE };
  loginInputId = nanoid();
  emailInputId = nanoid();
  passwordInputId = nanoid();
  agreedInputId = nanoid();
  fileInputId = nanoid();

  handleFileChange = (evt) => {
    this.setState({ file: evt.target.files[0] }); // Save first file to state
  };

  handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    this.setState({ [name]: type === "checkbox" ? checked : value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    if (this.state.file) {
      console.log(
        `File: ${this.state.file.name}, size: ${this.state.file.size}, type: ${this.state.file.type}`,
      );
    }

    const { login, email, password, agreed, gender, age } = this.state;
    // console.log(`Login-Old: ${login}, Email: ${email}, Password: ${password}, Agreed: ${agreed}, Gender: ${gender}, Age: ${age}`);

    // this.props.onSubmit({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { login, email, password, agreed, gender, age, file } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor={this.loginInputId}>Name</label>
        <input
          type="text"
          placeholder="Enter login"
          name="login"
          value={login}
          id={this.loginInputId}
          onChange={this.handleChange}
        />
        <label htmlFor={this.emailInputId}>Email</label>
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          value={email}
          id={this.emailInputId}
          onChange={this.handleChange}
        />
        <label htmlFor={this.passwordInputId}>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={password}
          id={this.passwordInputId}
          onChange={this.handleChange}
        />
        <label htmlFor={this.agreedInputId}>Agree to terms</label>
        <input
          type="checkbox"
          checked={agreed}
          name="agreed"
          id={this.agreedInputId}
          onChange={this.handleChange}
        />
        <section>
          <h2>Choose your gender</h2>
          <label>
            Male
            <input
              type="radio"
              checked={gender === Gender.MALE}
              name="gender"
              value={Gender.MALE}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Female
            <input
              type="radio"
              checked={gender === Gender.FEMALE}
              name="gender"
              value={Gender.FEMALE}
              onChange={this.handleChange}
            />
          </label>
        </section>
        <label>
          Choose your age
          <select name="age" value={age} onChange={this.handleChange}>
            <option value="" disabled>
              ...
            </option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36+">36+</option>
          </select>
        </label>
        <label htmlFor={this.fileInputId}>File Upload</label>
        <input
          type="file"
          name="file"
          id={this.fileInputId}
          onChange={this.handleFileChange}
        />
        <button type="submit">Sign up as {login}</button>
      </form>
    );
  }
}

export default LoginForm;

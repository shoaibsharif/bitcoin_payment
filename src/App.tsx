import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { motion } from "framer-motion";
import crypto from "crypto";
import classNames from "classnames";
import "./App.css";
const randomString = crypto.randomBytes(12).toString("hex");

function App() {
  const { register, control, setValue, handleSubmit, errors } = useForm({
    validateCriteriaMode: "all",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [getQuote, setQuote] = useState(false);

  const submitHandle = (data: any) => {
    console.log(data);
    setQuote(true);
  };
  return (
    <div className="App">
      <DevTool control={control} />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-3 box-shadow">
            <div className="wrapper">
              <form onSubmit={handleSubmit(submitHandle)}>
                <h2 className="form-title">Buy Crypto</h2>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors?.firstName,
                    })}
                    name="firstName"
                    placeholder="Enter First name"
                    ref={register({ required: "First Name required" })}
                  />
                  {errors?.firstName && (
                    <div className="invalid-feedback">
                      {errors?.firstName?.message}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors?.lastName,
                    })}
                    name="lastName"
                    placeholder="Enter Last Name"
                    ref={register({ required: "Last Name is required" })}
                  />
                  {errors?.lastName && (
                    <div className="invalid-feedback">
                      {errors?.lastName?.message}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors?.email,
                    })}
                    name="email"
                    placeholder="Enter email address"
                    ref={register({ required: "Email address required" })}
                  />
                  {errors?.email && (
                    <div className="invalid-feedback">
                      {errors?.email?.message}
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group col-md-8">
                    <label htmlFor="wallet">wallet Address</label>
                    <input
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors?.wallet,
                      })}
                      name="wallet"
                      ref={register({ required: "wallet address required" })}
                      disabled
                    />
                    {errors?.wallet && (
                      <div className="invalid-feedback">
                        {errors?.wallet?.message}
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-4 align-self-end">
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      className="btn btn-secondary form-control"
                      onClick={(e) => {
                        setValue("wallet", randomString);
                        setButtonDisabled(true);
                      }}
                      disabled={buttonDisabled}
                    >
                      Generate
                    </motion.button>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-3">
                    <label htmlFor="wallet">Wallet Type</label>
                    <select
                      className="form-control"
                      name="cryptoType"
                      ref={register}
                    >
                      <option value="BTC">BTC</option>
                      <option value="BCH">BCH</option>
                    </select>
                  </div>

                  <div className="form-group col-md-3">
                    <label htmlFor="currency">currency</label>
                    <select
                      className="form-control"
                      name="currency"
                      ref={register}
                    >
                      <option>USD</option>
                      <option>EUR</option>
                    </select>
                  </div>
                  <div className="form-group col-md-3 ">
                    <label htmlFor="purchase">Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="$2000"
                      name="amount"
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="form-group col-md-3 align-self-end">
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.9 }}
                      type="submit"
                      className="btn btn-secondary form-control"
                    >
                      Get Quote
                    </motion.button>
                  </div>
                </div>
              </form>
              {getQuote && (
                <motion.div
                  animate={{ x: 0, y: 0, scale: 1 }}
                  initial={{ x: 0, y: 8, scale: 1.3 }}
                  className="quotation"
                >
                  <h3 className="text-center">Quotation</h3>
                  <p>You will get 2 BTC for $21000</p>
                  <p>1 BTC --- $9,450</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

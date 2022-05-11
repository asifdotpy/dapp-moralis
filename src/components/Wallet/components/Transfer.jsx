import { CreditCardOutlined } from "@ant-design/icons";
import { Button, Input, notification } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const styles = {
  card: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    textAlign: "center",
  },
  input: {
    width: "100%",
    outline: "none",
    fontSize: "16px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textverflow: "ellipsis",
    appearance: "textfield",
    color: "#041836",
    fontWeight: "700",
    border: "none",
    backgroundColor: "transparent",
  },
  select: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
  },
  textWrapper: { maxWidth: "80px", width: "100%" },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexDirection: "row",
  },
};

function Transfer() {
  const { Moralis } = useMoralis();
  const receiver = "0x1EacF289f7411c32CB17275da5b3170482aC6CCF";
  const asset = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState();
  const [isPending, setIsPending] = useState(false);
  const [referrar, setReferrar] = useState();

  useEffect(() => {
    asset && amount && receiver ? setTx({ amount, receiver, asset }) : setTx();
  }, [asset, amount, receiver]);

  const openNotification = ({ message, description }) => {
    notification.open({
      placement: "bottomRight",
      message,
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  async function transfer() {
    const { amount, receiver, asset } = tx;

    console.log(asset);

    let options = {
      native: "native",
      amount: Moralis.Units.ETH(amount),
      receiver,
      awaitReceipt: false,
    };

    setIsPending(true);
    const txStatus = await Moralis.transfer(options);
    const result = await txStatus.wait();

    if (result) {
      console.log(result);
      console.log(result.blockHash);
      openNotification({
        message: "🔊 New Transaction",
        description: `${result.blockHash}`,
      });
      setIsPending(false);
    }

    const query = new Moralis.Query("_User");
    const results = await query.find();
    results[0].set("referredBy", referrar);
    await results[0].save();
    console.log(results);
  }

  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <h3>Earn Upto 2000% APY</h3>
        </div>
        <div style={styles.select}>
          <div style={styles.textWrapper}>
            <Text strong>Amount:</Text>
          </div>
          <Input
            size="large"
            prefix={<CreditCardOutlined />}
            onChange={(e) => {
              setAmount(`${e.target.value}`);
            }}
          />
        </div>
        <div style={styles.select}>
          <div style={styles.textWrapper}>
            <Text strong>Referrar:</Text>
          </div>
          <Input
            size="large"
            onChange={(e) => {
              setReferrar(`${e.target.value}`);
            }}
          />
        </div>
        <Button
          type="primary"
          size="large"
          loading={isPending}
          style={{ width: "100%", marginTop: "25px" }}
          onClick={() => transfer()}
          disabled={!tx}
        >
          Stake
        </Button>
      </div>
    </div>
  );
}

export default Transfer;

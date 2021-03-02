export default ({ elements, alertMessage, toSendInFn }) => {
  if (toSendInFn === '') return alert(alertMessage)
  elements.forEach((el) => el(toSendInFn))
}

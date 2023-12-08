var TextBoxList = React.createClass({
  getInitialState: function () {
    return { count: 1 };
  },
  add: function () {
    this.setState({ count: this.state.count + 1 });
  },
  render: function () {
    var items = [];
    for (var i = 0; i < this.state.count; i++) {
      items.push(
        <li key={i}>
          <input type="text" name="" id="" placeholder="change me!" />
        </li>
      );
    }
    return (
      <ul>
        {items}
        <input type="button" value="Add an item" onClick={this.add} />
      </ul>
    );
  },
});

ReactDOM.render(
  <div>
    <p>
      만약 이 배열에 새로운 텍스트를 추가하게 되면 리액트는 전체 배열을 새로
      렌더링하지만, 기존의 input 내용에 있던 것은 그대로 유지합니다. 리액트는
      기존의 모든 DOM 요소를 초기화하지 않고, 새로운 text를 추가하는 방식으로
      똑똑하게 작동합니다
    </p>
    <TextBoxList />
  </div>,
  document.getElementById("container")
);

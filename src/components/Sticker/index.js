import React, { Component } from 'react';
import { StickerWidgetWrapper } from './style';

export default class extends Component {
  render() {
    const { fontColor, bgColor, width, icon, number, text } = this.props;

    const textColor = {
      color: fontColor
    };
    const widgetStyle = {
      backgroundColor: bgColor,
      width: width
    };
    const iconStyle = {
      color: fontColor
    };

    return (
      <StickerWidgetWrapper className="isoStickerWidget" style={{ ...widgetStyle, margin: '0 10px' }}>
        <div className="isoIconWrapper">
            {icon}
        </div>

        <div className="isoContentWrapper">
          <h3 className="isoStatNumber" style={textColor}>
            {number}
          </h3>
          <span className="isoLabel" style={textColor}>
            {text}
          </span>
        </div>
      </StickerWidgetWrapper>
    );
  }
}

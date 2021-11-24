/* eslint-disable @typescript-eslint/no-empty-function */
import { InputProps, OTPInputViewState } from 'react-native-otp-input';
import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  I18nManager,
  EmitterSubscription,
  StyleSheet,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

export default class OTPInputView extends Component<
  InputProps,
  OTPInputViewState
> {
  static defaultProps = {
    pinCount: 6,
    autoFocusOnLoad: true,
    secureTextEntry: false,
    editable: true,
    keyboardAppearance: 'default',
    keyboardType: 'number-pad',
    clearInputs: false,
    placeholderCharacter: '',
    selectionColor: '#000',
  };

  private fields: TextInput[] | null[] = [];
  private keyboardDidHideListener?: EmitterSubscription;
  private timer?: NodeJS.Timeout;
  private hasCheckedClipBoard?: boolean;
  private clipBoardCode?: string;

  constructor(props) {
    super(props);
    const { code } = props;

    this.state = {
      digits: this.codeToArray(code),
      selectedIndex: props.autoFocusOnLoad ? 0 : -1,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { code } = this.props;
    if (nextProps.code !== code) {
      this.setState({ digits: this.codeToArray(nextProps.code) });
    }
  }

  componentDidMount() {
    this.copyCodeFromClipBoardOnAndroid();
    this.bringUpKeyBoardIfNeeded();
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.handleKeyboardDidHide
    );
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.keyboardDidHideListener?.remove();
  }

  codeToArray = (code?: string): string[] => code?.split('') ?? [];

  isAutoFillSupported = () => {
    const majorVersionIOS = parseInt(String(Platform.Version), 10);
    return Platform.OS === 'ios' && majorVersionIOS >= 12;
  };

  private copyCodeFromClipBoardOnAndroid = () => {
    if (Platform.OS === 'android') {
      this.checkPinCodeFromClipBoard();
      this.timer = setInterval(this.checkPinCodeFromClipBoard, 400);
    }
  };

  bringUpKeyBoardIfNeeded = () => {
    const { autoFocusOnLoad, pinCount } = this.props;
    const digits = this.getDigits();
    const focusIndex = digits.length ? digits.length - 1 : 0;
    if (focusIndex < pinCount && autoFocusOnLoad) {
      this.focusField(focusIndex);
    }
  };

  getDigits = () => {
    const { digits: innerDigits } = this.state;
    const { code } = this.props;
    return code === undefined ? innerDigits : code.split('');
  };

  private handleKeyboardDidHide = () => {};

  private notifyCodeChanged = () => {
    const { digits } = this.state;
    const code = digits.join('');
    const { onCodeChanged } = this.props;
    if (onCodeChanged) {
      onCodeChanged(code);
    }
  };

  checkPinCodeFromClipBoard = () => {
    const { pinCount, onCodeFilled } = this.props;
    const regexp = new RegExp(`^\\d{${pinCount}}$`);
    Clipboard.getString().then((code) => {
      if (
        this.hasCheckedClipBoard &&
        regexp.test(code) &&
        this.clipBoardCode !== code
      ) {
        this.setState(
          {
            digits: code.split(''),
          },
          () => {
            this.notifyCodeChanged();
            onCodeFilled && onCodeFilled(code);
          }
        );
      }
      this.clipBoardCode = code;
      this.hasCheckedClipBoard = true;
    });
  };

  private handleChangeText = (index: number, text: string) => {
    const { onCodeFilled, pinCount } = this.props;
    const digits = this.getDigits();
    let newdigits = digits.slice();
    const oldTextLength = newdigits[index] ? newdigits[index].length : 0;
    const newTextLength = text.length;
    if (newTextLength - oldTextLength === pinCount) {
      // user pasted text in.
      newdigits = text.split('').slice(oldTextLength, newTextLength);
      this.setState({ digits: newdigits }, this.notifyCodeChanged);
    } else {
      if (text.length === 0) {
        if (newdigits.length > 0) {
          newdigits = newdigits.slice(0, newdigits.length - 1);
        }
      } else {
        text.split('').forEach((value) => {
          if (index < pinCount) {
            newdigits[index] = value;
            index += 1;
          }
        });
        index -= 1;
      }
      this.setState({ digits: newdigits }, this.notifyCodeChanged);
    }

    const result = newdigits.join('');
    if (result.length >= pinCount) {
      onCodeFilled && onCodeFilled(result);
      this.focusField(pinCount - 1);
    } else {
      if (text.length > 0 && index < pinCount - 1) {
        this.focusField(index + 1);
      }
    }
  };

  private handleKeyPressTextInput = (index: number, key: string) => {
    const digits = this.getDigits();
    if (key === 'Backspace') {
      if (!digits[index] && index > 0) {
        this.handleChangeText(index - 1, '');
        this.focusField(index - 1);
      }
    }
  };

  focusField = (index: number) => {
    if (index < this.fields.length) {
      (this.fields[index] as TextInput).focus();
      this.setState({
        selectedIndex: index,
      });
    }
  };

  clearAllFields = () => {
    const { clearInputs, code } = this.props;
    if (clearInputs && code === '') {
      this.setState({ digits: [], selectedIndex: 0 });
    }
  };

  renderOneInputField = (_: TextInput, index: number) => {
    const {
      codeInputFieldStyle,
      codeInputHighlightStyle,
      secureTextEntry,
      editable,
      keyboardType,
      selectionColor,
      keyboardAppearance,
    } = this.props;
    const { defaultTextFieldStyle } = styles;
    const { selectedIndex, digits } = this.state;
    const { clearInputs, placeholderCharacter, placeholderTextColor } =
      this.props;

    const { color: defaultPlaceholderTextColor = '' } = {
      ...defaultTextFieldStyle,
      ...codeInputFieldStyle,
    };
    return (
      <View
        pointerEvents="none"
        key={index + 'view'}
        testID="inputSlotView"
        style={{ marginRight: 10 }}
      >
        <TextInput
          testID="textInput"
          underlineColorAndroid="rgba(0,0,0,0)"
          style={
            selectedIndex === index
              ? [
                  defaultTextFieldStyle,
                  codeInputFieldStyle,
                  codeInputHighlightStyle,
                ]
              : [defaultTextFieldStyle, codeInputFieldStyle]
          }
          ref={(ref) => {
            this.fields[index] = ref;
          }}
          onChangeText={(text) => {
            this.handleChangeText(index, text);
          }}
          onKeyPress={({ nativeEvent: { key } }) => {
            this.handleKeyPressTextInput(index, key);
          }}
          value={!clearInputs ? digits[index] : ''}
          keyboardAppearance={keyboardAppearance}
          keyboardType={keyboardType}
          textContentType={this.isAutoFillSupported ? 'oneTimeCode' : 'none'}
          key={index}
          selectionColor={selectionColor}
          secureTextEntry={secureTextEntry}
          editable={editable}
          placeholder={placeholderCharacter}
          placeholderTextColor={
            placeholderTextColor || defaultPlaceholderTextColor
          }
        />
      </View>
    );
  };

  renderTextFields = () => {
    const { pinCount } = this.props;
    const array = new Array(pinCount).fill(0);
    return array.map(this.renderOneInputField);
  };

  render() {
    const { pinCount, style, clearInputs } = this.props;
    const digits = this.getDigits();
    return (
      <View testID="OTPInputView" style={style}>
        <TouchableWithoutFeedback
          style={{ width: '100%', height: '100%' }}
          onPress={() => {
            if (!clearInputs) {
              const filledPinCount = digits.filter((digit) => {
                return digit !== null && digit !== undefined;
              }).length;
              this.focusField(Math.min(filledPinCount, pinCount - 1));
            } else {
              this.clearAllFields();
              this.focusField(0);
            }
          }}
        >
          <View
            style={{
              flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
              width: '100%',
              height: '100%',
            }}
          >
            {this.renderTextFields()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  defaultTextFieldStyle: {
    width: 45,
    height: 45,
    borderColor: 'rgba(226, 226, 226, 1)',
    borderWidth: 1,
    borderRadius: 2,
    textAlign: 'center',
    color: '#092147',
  },
});

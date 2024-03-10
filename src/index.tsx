import React, { useEffect } from 'react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import {
  Modal,
  Pressable,
  View,
  type ModalProps,
  type ViewProps,
  Dimensions,
  type GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import defaultColors from './defaultColors';
interface Props {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  colors?: Array<string>;
  randomStart?: boolean;
  openButtonProps?: ViewProps;
  modalProps?: ModalProps;
  modalViewProps?: ViewProps;
  colorButtonProps?: ViewProps;
  previewViewProps?: ViewProps;
}

const buttonSize =
  Dimensions.get('window').width * 0.1 > 50
    ? 50
    : Dimensions.get('window').width * 0.1;
interface ColorButtonProps {
  color: string;
  onPress: (event: GestureResponderEvent) => void;
  props?: ViewProps;
}
const ColorButton = ({ color, onPress, props }: ColorButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.openPressable}>
      <View
        {...props}
        style={[
          styles.colorButton,
          {
            backgroundColor: color,
          },
        ]}
      />
    </Pressable>
  );
};

export function ColorSelector({
  color,
  setColor,
  colors = defaultColors,
  randomStart = false,
  openButtonProps,
  modalProps,
  modalViewProps,
  colorButtonProps,
  previewViewProps,
}: Readonly<Props>) {
  useEffect(() => {
    if (randomStart) {
      setColor(colors[Math.floor(Math.random() * colors.length)] ?? '#ffffff');
    }
  }, [colors, randomStart, setColor]);
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  return (
    <>
      <ColorButton
        color={color}
        key={'open-' + color}
        onPress={open}
        props={openButtonProps}
      />

      <Modal visible={isOpen} transparent={true} {...modalProps}>
        <Pressable style={styles.outsidePressable} onPress={close}>
          <View style={styles.modalView} {...modalViewProps}>
            <Pressable>
              <View
                style={[styles.previewView, { backgroundColor: color }]}
                {...previewViewProps}
              />
              <View style={styles.buttonsView}>
                {colors.map((currentColor, index) => {
                  return (
                    <Pressable
                      key={color + index}
                      onPress={() => {
                        setColor(currentColor);
                      }}
                    >
                      <View
                        {...colorButtonProps}
                        style={[
                          styles.buttonView,
                          { backgroundColor: currentColor },
                        ]}
                      />
                    </Pressable>
                  );
                })}
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  outsidePressable: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: '#030204',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: buttonSize / 2,
    width: '80%',
    height: 'auto',
    alignSelf: 'center',
    borderRadius: buttonSize,
  },
  previewView: {
    height: buttonSize,
    maxHeight: buttonSize,
    width: buttonSize * 5,
    margin: 10,
    borderRadius: buttonSize,
    alignSelf: 'center',
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: buttonSize / 2,
    marginTop: buttonSize / 2,
  },
  buttonView: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: buttonSize,
    width: buttonSize,
    height: buttonSize,
    maxWidth: buttonSize,
    maxHeight: buttonSize,
  },
  colorButton: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: buttonSize,
    width: buttonSize,
    height: buttonSize,
    maxWidth: buttonSize,
    maxHeight: buttonSize,
  },
  openPressable: {
    flexShrink: 1,
  },
});

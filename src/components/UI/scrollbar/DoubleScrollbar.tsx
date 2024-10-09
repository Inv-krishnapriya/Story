import { ArrowRightIcon, MintTooltip } from "@/design-system";
import { Box, SxProps, TooltipProps, styled, useTheme } from "@mui/material";
import React, { ReactNode, RefObject } from "react";

interface DoubleScrollbarState {
  width: string;
  scrollStart: boolean;
  haveHorizontalScrollBar: boolean;
  upperScrollHarHovered: boolean;
}

interface ITooltipProps extends Omit<TooltipProps, "children"> {
  children?: ReactNode;
}
interface DoubleScrollbarProps {
  children: ReactNode;
  showTooltip?: boolean;
  tooltipProps?: ITooltipProps;
  rootContainerStyle?: SxProps;
  rootContainerClassName?: string;
  enableScrollRight?: boolean;
  tableContainerStyle?: SxProps;
  hideUpperScrollbar?: boolean;
  isLoading?: boolean;
  outerStyle?: SxProps;
  scrollRightDivStyle?: SxProps;
  setScrollBarStatus?: (value: boolean) => void;
  setHasInArrowClick?: (value: boolean) => void;
}

class DoubleScrollbar extends React.Component<
  DoubleScrollbarProps,
  DoubleScrollbarState
> {
  private outerDivRef: RefObject<HTMLDivElement> = React.createRef();
  private innerDivRef: RefObject<HTMLDivElement> = React.createRef();
  private childrenWrapperRef: RefObject<HTMLDivElement> = React.createRef();
  private boundCalculateWidth: () => void;

  constructor(props: DoubleScrollbarProps) {
    super(props);
    this.state = {
      width: "auto",
      scrollStart: false,
      haveHorizontalScrollBar: false,
      upperScrollHarHovered: false,
    };
    this.boundCalculateWidth = this.calculateWidth.bind(this);
  }

  componentDidMount() {
    const outerDiv = this.outerDivRef.current;
    const childWrapper = this.childrenWrapperRef.current;

    // Set initial width
    this.calculateWidth();
    this.checkScrollBar();
    // Update width when window size changes
    window.addEventListener("resize", this.boundCalculateWidth);
    const changeScrollStart = () => {
      this.setState({
        scrollStart: true,
      });
    };

    // Assoc the scrolls
    if (outerDiv && childWrapper) {
      outerDiv.onscroll = function () {
        changeScrollStart();

        if (childWrapper) {
          childWrapper.scrollLeft = outerDiv.scrollLeft;
        }
      };

      childWrapper.onscroll = function () {
        changeScrollStart();

        if (outerDiv) outerDiv.scrollLeft = childWrapper.scrollLeft;
      };
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.boundCalculateWidth);
  }

  componentDidUpdate(
    prevProps: DoubleScrollbarProps,
    prevState: DoubleScrollbarState
  ) {
    this.calculateWidth();
    if (this.state.width !== prevState.width) {
      // Width has changed, check for scroll bar again
      this.checkScrollBar();
    }
  }
  calculateWidth() {
    const width = this.getChildWrapperWidth();

    // Set the width of the inner div to the first child's
    if (width !== this.state.width) {
      this.setState({
        width: width!,
      });
    }
  }

  getChildWrapperWidth() {
    let width: string | null = null;
    const childWrapper = this.childrenWrapperRef.current;
    if (childWrapper && childWrapper.scrollWidth) {
      width = childWrapper.scrollWidth + "px";
    }
    return width;
  }

  scrollRight = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    _event.preventDefault();
    const outerDiv = this.outerDivRef.current;
    if (outerDiv) {
      outerDiv.scrollLeft += 100;
    }
  };
  checkScrollBar = () => {
    const childWrapper = this.childrenWrapperRef.current;

    if (childWrapper) {
      const haveHorizontalScrollBar =
        childWrapper.scrollWidth > childWrapper.clientWidth;
      console.log(childWrapper.scrollWidth, childWrapper.clientWidth, "test");

      this.setState({
        haveHorizontalScrollBar,
      });
      if (this.props.setScrollBarStatus) {
        this.props.setScrollBarStatus(haveHorizontalScrollBar);
      }
    }
  };

  render() {
    const outerDivStyle: React.CSSProperties = {
      overflowX: "auto",
      overflowY: "hidden",
      ...(this.props.hideUpperScrollbar && { display: "none" }),
    };
    const innerDivStyle: React.CSSProperties = {
      paddingTop: "1px",
      width: this.state.width,
      height: 0,
    };
    const childDivStyle: React.CSSProperties = {
      overflow: "auto",
      overflowY: "hidden",
      userSelect: "none",
    };
    return (
      <Box
        className="double-scroll-outer"
        position={"relative"}
        sx={this.props.outerStyle}
      >
        <Box
          className={
            this.props?.rootContainerClassName ?? "double-scroll-container"
          }
          sx={this.props.rootContainerStyle}
        >
          <div>
            {this.props.showTooltip ? (
              <MintTooltip
                title={
                  this.props.tooltipProps?.title ??
                  "更にデータを表示するにはスクロールしてください。"
                }
                {...this.props.tooltipProps}
                open={
                  this.state.upperScrollHarHovered
                    ? !this.state.scrollStart
                    : false // Set to undefined to use default behavior
                }
              >
                <Box
                  ref={this.outerDivRef}
                  style={outerDivStyle}
                  onMouseEnter={(e) => {
                    this.setState({
                      upperScrollHarHovered: true,
                    });
                  }}
                  onMouseLeave={(e) => {
                    this.setState({
                      upperScrollHarHovered: false,
                      scrollStart: false,
                    });
                  }}
                  data-testid="mouse-enter"
                >
                  <div ref={this.innerDivRef} style={innerDivStyle}>
                    &nbsp;
                  </div>
                </Box>
              </MintTooltip>
            ) : (
              <div ref={this.outerDivRef} style={outerDivStyle}>
                <div ref={this.innerDivRef} style={innerDivStyle}>
                  &nbsp;
                </div>
              </div>
            )}
            <Box
              ref={this.childrenWrapperRef}
              sx={{
                ...childDivStyle,
                ...this.props.tableContainerStyle,
              }}
            >
              {this.props.children}
            </Box>
          </div>
        </Box>
        {this.props.enableScrollRight &&
          this.state.haveHorizontalScrollBar &&
          !this.props.isLoading && (
            <Box
              sx={{
                boxShadow: "-5px 0px 12px 0px rgba(0, 0, 0, 0.08)",
                display: "flex",
                width: "32px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                position: "absolute",
                right: 0,
                top: "17px",
                bottom: "17px",
                zIndex: 1000,
                backgroundColor: (theme) =>
                  theme.mint.color.background.containerBg.layer1,
                ...(this.props.scrollRightDivStyle ?? {}),
              }}
              onMouseEnter={() => {
                if (this?.props?.setHasInArrowClick) {
                  this.props.setHasInArrowClick(true);
                }
              }}
              onMouseLeave={() => {
                if (this?.props?.setHasInArrowClick) {
                  this.props.setHasInArrowClick(false);
                }
              }}
            >
              <Box
                sx={{
                  cursor: "pointer",
                }}
                onClick={(
                  event: React.MouseEvent<HTMLDivElement, MouseEvent>
                ) => {
                  event.stopPropagation();
                  this.scrollRight(event);
                }}
              >
                <ArrowRightIcon color={"#162987"} />
              </Box>
            </Box>
          )}
      </Box>
    );
  }
}

export default DoubleScrollbar;

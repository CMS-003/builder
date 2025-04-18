import { FullHeight, FullHeightAuto, FullHeightFix, FullWidth } from "@/components/style";
import { Observer, useLocalObservable } from "mobx-react-lite";
import Nav from "@/components/Nav";
import { useCallback, useEffect } from "react";
import apis from "@/apis";
import Player from "@/components/Player";
import { toJS } from "mobx";
import styled from "styled-components";
import { useStore } from "@/contexts/index.js";
import Visible from "@/components/Visible";
import { Space } from "antd-mobile";
import ResourceItem from "@/adaptor/index.js";

const Title = styled.h1`
  font-size: 1.1em;
  font-weight: 500;
  margin: 0;
  padding: 10px;
`
export const Epsode = styled.span`
  color: ${({ selected }) => (selected ? 'rgb(0 165 253)' : '#888')};
  margin: 2px 3px;
  padding: 2px;
  position: relative;
  font-size: 12px;
  white-space: nowrap;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 200%;
    border: 1px solid
      ${({ selected }) => (selected ? 'rgb(0 165 253)' : '#888')};
    border-radius: 6px;
    transform-origin: 0 0;
    transform: scale(0.5);
    box-sizing: border-box;
    pointer-events: none;
  }
`;

export default function VideoPage(props) {
  const store = useStore();
  const local = useLocalObservable(() => ({
    resource: null,
    loading: true,
    error: null,
    video: null,
    recommends: [],
    setValue: function (key, value) {
      local[key] = value;
    }
  }));
  const getDetail = useCallback(async () => {
    local.setValue('loading', true);
    try {
      const resp = await apis.getResourceDetail(props.id);
      if (resp && resp.code === 0) {
        local.setValue('resource', resp.data)
        local.setValue('video', resp.data.videos[0] || null)
      } else {
        local.setValue('error', { code: resp.code, message: resp.message })
      }
    } catch (e) {
      local.setValue('error', e)
    } finally {
      local.setValue('loading', false);
    }

  }, [local, props.id])
  const getRecommends = () => {

  }
  useEffect(() => {
    getDetail();
  }, [getDetail])
  return <Observer>{() => (
    <FullHeight>
      <FullHeightFix style={{ flexDirection: 'column' }}>
        <Player
          resource={local.resource}
          video={local.video}
          looktime={0}
          type="mp4"
        />
      </FullHeightFix>
      <FullHeightAuto>
        <Title>{local.resource && local.resource.title}</Title>
        <Visible visible={local.resource && local.resource.videos.length > 1}>
          <p
            style={{
              fontWeight: 'bolder',
              margin: 0,
              padding: 5,
            }}
          >
            播放列表
          </p>
          <FullWidth style={{ alignItems: 'baseline', overflow: 'auto' }}>
            {local.resource && local.resource.videos.map((child) => (
              <Epsode
                key={child.path}
                onClick={() => {
                  if (local.vid !== child._id) {
                    local.video = child;
                    local.looktime = 0;
                  }
                }}
                selected={local.video && local.video._id === child._id}
              >
                {child.title || `第${child.nth}集`}
              </Epsode>
            ))}
          </FullWidth>
        </Visible>
        {local.recommends.map(v => (
          <ResourceItem key={v._id} item={v} type="LPRT" />
        ))}
      </FullHeightAuto>
    </FullHeight>
  )}</Observer>
}
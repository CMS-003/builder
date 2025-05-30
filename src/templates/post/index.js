import { Fragment, useCallback, useEffect } from "react";
import { Observer, useLocalObservable } from "mobx-react-lite";
import { Ellipsis, Space, Tag } from "antd-mobile";
import { FullHeight, FullHeightAuto, FullHeightFix, FullWidth } from "@/components/style";
import { useStore } from "@/contexts/index.js";
import Nav from "@/components/Nav";
import apis from "@/apis";
import styled from "styled-components";
import { default as dayjs } from "dayjs";
import SafeArea from "@/components/SafeArea/index.js";

const Title = styled.h1`
  font-size: 1.4em;
  font-weight: 550;
  margin: 0;
  padding: 10px;
`

export default function PostPage(props) {
  const store = useStore();
  const local = useLocalObservable(() => ({
    resource: null,
    loading: true,
    error: null,
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
    <SafeArea topBGC="lightblue" botBGC="transparent">
      <FullHeight>
        <FullHeightFix>
          <Nav title={local.resource ? local.resource.title : ''} align="left" style={{ color: 'initial', backgroundColor: 'lightblue' }} />
        </FullHeightFix>
        <FullHeightAuto>
          {local.resource ? <Fragment>
            <span style={{ padding: '0 8px 8px', display: 'inline-block' }}>{dayjs(local.resource.publishedAt).format('YYYY年MM月日DD HH:mm')}</span>
            <p style={{ padding: '0 10px' }} dangerouslySetInnerHTML={{ __html: local.resource.content }}></p>
            {local.resource.images.map(image => (
              <img key={image._id} src={store.app.imageLine + image.path} style={{ width: '100%' }} alt=""/>
            ))}
            {local.resource.videos.map(video => (
              <video key={video._id} src={store.app.videoLine + video.path} controls style={{ width: '100%' }} />
            ))}
          </Fragment> : null}
        </FullHeightAuto>
        <FullWidth style={{ alignItems: 'baseline', overflow: 'auto', margin: 10 }}>
          <Space>
            {(local?.resource?.tags || []).map(tag => (
              <Tag key={tag} round color='#2db7f5' style={{ padding: '4px 6px' }}>
                {tag}
              </Tag>
            ))}
          </Space>
        </FullWidth>
      </FullHeight>
    </SafeArea>
  )}</Observer>
}
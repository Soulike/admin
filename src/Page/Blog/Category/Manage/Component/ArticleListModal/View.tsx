import React from 'react';
import Style from './Style.module.scss';
import ArticleList from '../../../../../../Component/ArticleList/Container';
import {Modal} from 'antd';
import {ModalProps} from 'antd/lib/modal';
import {Category} from '../../../../../../Class';

interface Props
{
    visible: ModalProps['visible'],
    categoryInModal?: Category,
    onOk: ModalProps['onOk'],
    onCancel: ModalProps['onCancel'],
}

function ArticleListModalView(props: Props)
{
    const {visible, categoryInModal, onOk, onCancel} = props;
    return (
        <Modal title={`分类"${categoryInModal ? categoryInModal.name : ''}"下的文章`}
               visible={visible}
               width={'80vw'}
               onOk={onOk}
               onCancel={onCancel} destroyOnClose={true}>
            <div className={Style.ArticleListModal}>
                <ArticleList categoryIdFilter={categoryInModal ? categoryInModal.id : undefined} />
            </div>
        </Modal>
    );
}

export default React.memo(ArticleListModalView);
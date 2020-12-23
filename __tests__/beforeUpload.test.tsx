import { useUploadAction } from '../src/component/customHooks';

describe('useUploadAction:', () => {
  test('BeforeUpload return true:', () => {
    const beforeUpload = jest.fn(() => true);
    const [beforeUploadAction] = useUploadAction(beforeUpload);

    beforeUploadAction([])
      .then(res => {
        expect(res).toBe(true);
      });
  });

  test('BeforeUpload return false:', () => {
    const beforeUpload = jest.fn(() => false);
    const [beforeUploadAction] = useUploadAction(beforeUpload);

    beforeUploadAction([])
      .catch(err => {
        expect(err).toEqual(new Error('err'));
      });
  });

  test('BeforeUpload return Promise resolve:', () => {
    const beforeUpload = jest.fn(() => new Promise((...rest) => {
      rest[0](true);
    }));
    const [beforeUploadAction] = useUploadAction(beforeUpload);

    beforeUploadAction([])
      .then(res => {
        expect(res).toEqual(true);
      });
  });

  test('BeforeUpload return Promise reject:', () => {
    const beforeUpload = jest.fn(() => new Promise((...rest) => {
      rest[1](new Error('err'));
    }));
    const [beforeUploadAction] = useUploadAction(beforeUpload);

    beforeUploadAction([])
      .catch(res => {
        expect(res).toEqual(new Error(`${new Error('err')}`));
      });
  });
});

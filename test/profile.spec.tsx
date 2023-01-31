import { screen, fireEvent, render, waitFor } from '@testing-library/react'
import { commands, events } from 'npm-upload-9781'
import Profile from '../src/delete/Profile'

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
}))

import { HashRouter, MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'

const mockedUsedNavigate = jest.fn()

const mockProfile = {
    logs: false,
    name: 'neil-desk',
    publickey:
        '0x30819F300D06092A864886F70D010101050003818D0030818902818100909D39F28BE146E6C8CAFFEDB6D455742AD40555D691D6693B087AED01FD786DA6938945340C1FF5B8CA9563359A393EAA15D48D1BBDFB181A222376836E9E54E9CF8F78E26884C17F38F511C2043B24E1BBBA54F72E2B23666364B65844BF36D99968C6537508A4C45766594497E99183117247D6D22950F323E46F099B17750203010001',
    staticmls: false,
    mls: 'MxG18HGG6FJ038614Y8CW46US6G20810K0070CD00Z83282G60G1BNSV07SJ43EBV6FFNYK993KGJ1U2EQD66GSRD1S52RVBU30RKT4SEKDGK22DGN11J6D77EY0DD9T77RFE863B2QU8D1Z02S46QK08A6TR9J802A627QV1FQS765QJU7VR4RG5TYD0Z55KU4ZJU16Y5KC0S8RJ5TMHFPAUAD4E2GWVTQ44AZMPFV2WV95KBM450FBUQQUAZ1G4106080042PTQTM@5.189.130.43:9001',
    localidentity:
        'MxG18HGG6FJ038614Y8CW46US6G20810K0070CD00Z83282G60G1B7ER0YVWQER29J3M5YWQ61M5NF0JACYF3YJ8RJNN7RUAAUK48UNCFJAYN17GGC2WJ4EU6YN08Z2NPRRWWQK28Q8AZKFJRP3HSJF7SVC3H2472RCS5M6CQQGP8MM9V5CEMPKQ4ZEQZ8YJG478R9E8VYTVQ63KSA6CEGA2AFW63R12CK1YHK9S59996DSG9HNAZ8ET3VP39BFK410608004CC7J6R@172.17.0.2:9001',
    contact:
        'MxG18HGG6FJ038614Y8CW46US6G20810K0070CD00Z83282G60G1AGW33Z57T3248M2NM0AA5U7DG9YYE48NA43AR206UHEF24T7QVPT0AJFMMJE869NKQZCF3J87K1VP83G5N7KF55FK17V8GM8NK3Y2TN5VQJZDMF6Y05EBBSK4YC6WJYFDAJB3VHDVF5WQ2Z8J7U6R3YDAZZGWBJY6UVM4B7KRQ92BVZ8HANYKT918HGNEWGTF26PR4EG11ZRS10608006MTFGA7@5.189.130.43:9001',
}

beforeEach(() => {})

afterEach(() => {})

it('can edit user name', async () => {
    const mockedMaxima1 = jest.fn()
    const mockedMaxima2 = jest.fn()

    jest.spyOn(commands, 'maxima').mockImplementationOnce(mockedMaxima1)
    jest.spyOn(commands, 'maxima').mockImplementationOnce(mockedMaxima2)

    render(<Profile myProfile={mockProfile}></Profile>)

    const updateButton = screen.getByText('Edit your name')
    fireEvent.click(updateButton)
    await waitFor(() => screen.getByLabelText('Choose a display name'))

    expect(screen.getByText('Choose a display name')).toBeTruthy()

    const input = screen.getByLabelText('Choose a display name')

    const testName = 'delete-name-test'

    fireEvent.change(input, { target: { value: testName } })

    act(() => {
        const saveButton = screen.getByText('Save')
        fireEvent.click(saveButton)
    })

    await waitFor(() => screen.getByText('Your Maxima Address'))

    // 1st set your name
    expect(mockedMaxima1).toBeCalledWith({ action: 'setname', name: testName })

    // then get the delete name
    expect(mockedMaxima2).toBeCalledWith()
})

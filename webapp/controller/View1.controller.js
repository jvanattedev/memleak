sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/unified/library',
    'sap/ui/unified/DateTypeRange'
],
    function (Controller, unifiedLibrary, DateTypeRange) {
        'use strict'

        const CalendarDayType = unifiedLibrary.CalendarDayType

        return Controller.extend('memleak.controller.View1', {
            onInit() {
                const oModel = this.getOwnerComponent().getModel('specialDates')
                this.getView().setModel(oModel)
                this.getOwnerComponent().getRouter().getRoute('RouteView1').attachPatternMatched(this.onPatternMatched, this)
            },

            onPatternMatched() {
                this.addSpecialDates(this.loadDates())
            },

            loadDates() {

            },

            handleCalenderSelect(oEvent) {

            },

            addSpecialDates() {
                const oCalendar = this.byId('calendar')
                const aDates = this.getView().getModel().getData()
                oCalendar.destroySpecialDates()
                let oSpecialDate

                for (const date of aDates) {
                    switch (date.absenceCode) {
                        case 'AV': oSpecialDate = new DateTypeRange({
                            startDate: this.parseDateString(date.begda),
                            type: CalendarDayType.Type01,
                            color: '#FFD700',
                            tooltip: date.hooverDescription
                        })
                            break

                        case 'GV': oSpecialDate = new DateTypeRange({
                            startDate: this.parseDateString(date.begda),
                            type: CalendarDayType.Type08,
                            tooltip: date.hooverDescription
                        })
                            break

                        case 'FD': oSpecialDate = new DateTypeRange({
                            startDate: this.parseDateString(date.begda),
                            type: CalendarDayType.Type11,
                            color: '#CCCCCC',
                            tooltip: date.hooverDescription,
                            secondaryType: CalendarDayType.NonWorking
                        })
                            break

                        case 'OA': oSpecialDate = new DateTypeRange({
                            startDate: this.parseDateString(date.begda),
                            type: CalendarDayType.Type07,
                            color: '#255E7E',
                            tooltip: date.hooverDescription,
                        })
                            break

                        case 'GZ': oSpecialDate = new DateTypeRange({
                            startDate: this.parseDateString(date.begda),
                            type: CalendarDayType.Type03,
                            tooltip: date.hooverDescription,
                        })
                            break

                        case 'NW': oSpecialDate = new DateTypeRange({
                            startDate: this.parseDateString(date.begda),
                            type: CalendarDayType.Type11,
                            color: '#EBEBEB',
                            tooltip: date.hooverDescription,
                            secondaryType: CalendarDayType.NonWorking
                        })
                            break

                        default: break
                    }
                    oCalendar.addSpecialDate(oSpecialDate)
                }
            },

            parseDateString(dateString) {
                const year = dateString.substr(0, 4)
                const month = dateString.substr(4, 2) - 1
                const day = dateString.substr(6, 2)
                const hours = '00'
                const minutes = '00'
                const seconds = '00'
                const milliseconds = '000'

                return new Date(year, month, day, hours, minutes, seconds, milliseconds);
            }
        })
    })